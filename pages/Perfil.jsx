import { StyleSheet, View, Text, Alert } from "react-native";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { api_url } from "../constantes";
import { AuthContext } from "../context/AuthContext";
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
      <View style={{ padding: 10 }}>
        <Text>Cargando... </Text>
      </View>
    );
  }
  return (
    <View style={{ padding: 10 }}>
      <Text>1. Nombre: {usuario.nombre} </Text>
      <Text>2. Correo: {usuario.correo} </Text>
      <Text>3. Dirección: Col. Enmaculado concepcion</Text>
      <Text>4. Bloque: 10, casa </Text>
      <Text>5. Ciudad: Choluteca, Choluteca</Text>
      <Text>6. País: Honduras</Text>
      <Text>7. Número de telefono: 99296817 </Text>
    </View>
  );
}

StyleSheet;
