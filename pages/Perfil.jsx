import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useReducer,
  useEffect,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, PrimaryButton } from "../components";
import { AuthContext } from "../context";
import { compareObjs } from "../constantes";
export function Perfil({ navigation }) {
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
    }
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !compareObjs(usuario, usuarioCopy) ? (
          <TouchableOpacity
            onPress={() => {
              console.log(usuario);
            }}
          >
            <Text style={{ color: "#0984e3" }}>Actualizar</Text>
          </TouchableOpacity>
        ) : (
          <></>
        ),
    });
  }, [usuario]);

  // funcion inicial
  useEffect(() => {
    getUserInfo();
  }, []);

  // variables
  const [cargando, setCargando] = useState(true);
  const [usuarioCopy, setUsuarioCopy] = useState({});

  const [collapsed, setCollapsed] = useState(true);
  const { checkAuth } = useContext(AuthContext);

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
    </ScrollView>
  );
}
