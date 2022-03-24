import {
  TouchableOpacity,
  View,
  Image,
  Alert,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useReducer,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../components";
import { compareObjs } from "../constantes";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

const { width } = Dimensions.get("window");

export function Perfil({ navigation }) {
  // variables
  const [usuario, setUsuario] = useReducer(
    (preUsuario, newProp) => {
      return { ...preUsuario, ...newProp };
    },
    {
      nombre: "",
      correo: "",
      imagenUrl: "",
      telefono: "",
      bloque: "",
      ciudad: "",
      colonia: "",
      direccion: "",
      latitude: 0,
      longitude: 0,
    }
  );
  const [cargando, setCargando] = useState(true);
  const [usuarioCopy, setUsuarioCopy] = useState({});
  const [ubicacion, setUbicacion] = useState({ latitude: 0, longitude: 0 });
  const [collapsed, setCollapsed] = useState(true);
  const mapaRef = useRef();
  // funciones

  // funcion inicial
  useEffect(() => {
    getUserInfo();
  }, []);

  // mostar boton de actualizar usuario
  useLayoutEffect(() => {
    if (cargando) return;
    navigation.setOptions({
      headerRight: () =>
        !compareObjs(usuario, usuarioCopy) ? (
          <TouchableOpacity onPress={actualizarUsuario}>
            <Text style={{ color: "#0984e3" }}>Actualizar</Text>
          </TouchableOpacity>
        ) : (
          <></>
        ),
    });
    if (ubicacion.latitude) {
      return;
    }
    if (usuario.latitude && usuario.longitude) {
      setUbicacion({
        latitude: usuario.latitude,
        longitude: usuario.longitude,
      });
      if (usuario.imagenUrl) {
        setImagen({ uri: usuario.imagenUrl });
      }
      return;
    }
    obtenerUbicacion();
  }, [usuario, ubicacion]);

  // funciones
  async function getUserInfo() {
    try {
      const { data } = await axios.get("/usuarios/me");
      console.log(data);
      setCargando(false);
      setUsuarioCopy(data.usuario);
      setUsuario(data.usuario);
    } catch (error) {
      console.log(error);
    }
  }
  const [imagen, setImagen] = useState();
  async function abrirGaleria() {
    const res = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.cancelled) {
      setImagen(res);
      console.log(res);
      setUsuario({ imagenUrl: res.uri });
    }
  }

  async function actualizarUsuario({ quiet = false }) {
    setCargando(true);
    const form = new FormData();
    /**
     * @type {string[]}
     */
    let ext = imagen.uri.split(".");
    ext = ext[ext.length - 1];
    try {
      form.append("perfil", {
        filename: `perfil.${ext}`,
        name: `perfil.${ext}`,
        type: `${imagen.type}/${ext}`,
        uri: imagen.uri,
      });
      Object.keys(usuario).forEach((k) => {
        if (k != "imagenUrl") {
          form.append(k, usuario[k]);
        }
      });
      const res = await fetch(axios.defaults.baseURL + "/usuarios", {
        method: "PUT",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data",
          ...axios.defaults.headers,
        },
      });
      let data = await res.json();
      setCargando(false);
      console.log(data);
      if (data.usuario) {
        setUsuarioCopy(usuario);
        setUsuario(usuario);
        console.log("Usuario actualizado");
        if (!quiet) {
          Alert.alert("Ferreteria Movil", "Usuario actualizado");
        }
        return;
      }
      Alert.alert(
        "Ferreteria Movil",
        "No se pudo actualizar intente de nuevo "
      );
    } catch (error) {
      console.log(error);
      setCargando(false);
    }
  }
  async function obtenerUbicacion() {
    let res = await requestForegroundPermissionsAsync();
    console.log(res);
    if (res.granted) {
      const { coords } = await getCurrentPositionAsync();
      setUsuario({ latitude: coords.latitude, longitude: coords.longitude });
      setUsuarioCopy({
        ...usuarioCopy,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      return;
    }
  }

  // renderizar
  if (cargando) {
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }
  return (
    <ScrollView
      style={{ padding: 10, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <TouchableOpacity onPress={abrirGaleria}>
        {imagen ? (
          <View
            style={{
              borderRadius: 100,
              borderColor: "#f3f3f3",
              borderWidth: 1,
            }}
          >
            <Image
              source={{ uri: imagen.uri, width: 200, height: 200 }}
              style={{
                borderRadius: 100,
              }}
            />
          </View>
        ) : (
          <MaterialIcons name="account-circle" size={200} color="#3495eb" />
        )}
      </TouchableOpacity>
      <View>
        <Text>Nombre:</Text>
        <Input
          value={usuario.nombre}
          onChangeText={(nombre) => setUsuario({ nombre })}
        />
      </View>
      <View>
        <Text>Correo: </Text>
        <Input
          value={usuario.correo}
          onChangeText={(correo) => setUsuario({ correo })}
        />
      </View>

      <View>
        <Text>Número de telefono: </Text>
        <Input
          keyboardType="numeric"
          value={usuario.telefono}
          onChangeText={(telefono) => setUsuario({ telefono })}
        />
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
        }}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text>Direccion</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </TouchableOpacity>

      {collapsed ? (
        <></>
      ) : (
        <>
          <View>
            <Text>Ciudad:</Text>
            <Input
              value={usuario.ciudad}
              onChangeText={(ciudad) => setUsuario({ ciudad })}
            />
          </View>
          <View>
            <Text>Colonia:</Text>
            <Input
              value={usuario.colonia}
              onChangeText={(colonia) => setUsuario({ colonia })}
            />
          </View>
          <View>
            <Text>Bloque:</Text>
            <Input
              value={usuario.bloque}
              onChangeText={(bloque) => setUsuario({ bloque })}
            />
          </View>
          <View>
            <Text>Detalles: </Text>
            <Input
              value={usuario.direccion}
              onChangeText={(direccion) => setUsuario({ direccion })}
            />
          </View>
        </>
      )}
      <MapView
        initialRegion={
          ubicacion && {
            ...ubicacion,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }
        }
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapaRef}
        style={{ width, height: width }}
      >
        <Marker coordinate={ubicacion} title="Mi Ubicacion">
          <Entypo name="home" size={24} color="#00a8ff" />
        </Marker>
      </MapView>
    </ScrollView>
  );
}
