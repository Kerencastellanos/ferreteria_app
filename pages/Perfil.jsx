import {
  TouchableOpacity,
  View,
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
  useContext,
  useRef,
} from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../components";
import { AuthContext } from "../context";
import { compareObjs } from "../constantes";

import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

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
  const { checkAuth } = useContext(AuthContext);
  const mapaRef = useRef();

  // funciones

  // funcion inicial
  useEffect(() => {
    getUserInfo();
  }, []);

  // mostar boton de actualizar usuario
  useLayoutEffect(() => {
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
      actualizarUsuario({ quiet: true });
      return;
    }
    obtenerUbicacion();
  }, [usuario, ubicacion]);

  // navegar a la ubicacion del usuario
  useEffect(() => {
    // latitudeDelta y longitudeDelta representan
    // el zoom en el mapa
    if (mapaRef.current) {
      mapaRef.current.animateToRegion(
        { ...ubicacion, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        2000
      );
    }
  }, [ubicacion]);

  // funciones
  async function getUserInfo() {
    const { data } = await axios.get("/usuarios/me");
    console.log(data);
    setCargando(false);

    if (!data.usuario) {
      checkAuth();
      return;
    }
    setUsuarioCopy(data.usuario);
    setUsuario(data.usuario);
  }

  async function actualizarUsuario({ quiet = false }) {
    console.log("actualizarUsuario");
    console.log("send:", usuario);
    const { data } = await axios.put("/usuarios", usuario);
    console.log("recieved:", data);
    setUsuarioCopy(usuario);
    setUsuario(usuario);
    console.log("Usuario actualizado");
    if (!quiet) {
      Alert.alert("Ferreteria Movil", "Usuario actualizado");
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
