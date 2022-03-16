import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, PrimaryButton } from "../components";
import { AuthContext } from "../context";
export function Perfil({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text style={{ color: "#0984e3" }}>Actualizar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  // funcion inicial
  useEffect(() => {
    getUserInfo();
  }, []);

  // variables
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [collapsed, setCollapsed] = useState(true);
  const { checkAuth } = useContext(AuthContext);

  // funciones
  async function getUserInfo() {
    const { data } = await axios.get("/auth/me");
    console.log(data);
    setCargando(false);

    if (!data.usuario) {
      checkAuth();
      return;
    }
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
        <Input value={usuario.nombre} />
      </View>
      <View>
        <Text>Correo: </Text>
        <Input value={usuario.correo} />
      </View>

      <View>
        <Text>Número de telefono: </Text>
        <Input keyboardType="numeric" />
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
            <Input />
          </View>
          <View>
            <Text>Colonia:</Text>
            <Input />
          </View>
          <View>
            <Text>Bloque:</Text>
            <Input />
          </View>
          <View>
            <Text>Detalles: </Text>
            <Input />
          </View>
        </>
      )}
    </ScrollView>
  );
}
