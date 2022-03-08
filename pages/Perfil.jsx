import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { api_url } from "../constantes";
import { AuthContext } from "../context/AuthContext";
import { Input, PrimaryButton } from "../components";
export function Perfil() {
  const { token } = useContext(AuthContext);
  useEffect(() => {
    getUserInfo();
  }, []);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState({});
  async function getUserInfo() {
    const { data } = await axios.get(api_url + "/auth/me", {
      headers: {
        Authentication: token,
      },
    });
    console.log(data);
    setCargando(false);
    if (data.error) {
      Alert.alert("Ferreteria Movil", data.error);
      return;
    }
    if (!data.usuario) {
      Alert.alert(
        "Ferreteria Movil",
        "Ups ha habido un error al solicitar los datos"
      );
      return;
    }
    setUsuario(data.usuario);
  }
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
        <Text>Dirección: </Text>
        <Input />
      </View>
      <View>
        <Text>Bloque:</Text>
        <Input />
      </View>
      <View>
        <Text>Ciudad:</Text>

        <Input />
      </View>
      <View>
        <Text>País:</Text>
        <Input />
      </View>
      <View>
        <Text>Número de telefono: </Text>
        <Input />
      </View>

      <PrimaryButton style={{ marginBottom: 50 }}>Actualizar</PrimaryButton>
    </ScrollView>
  );
}

StyleSheet;
