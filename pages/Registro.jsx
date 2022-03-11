import axios from "axios";
import { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Input } from "../components";
import { AuthContext } from "../context";

export function Registro({ navigation }) {
  function irALogin() {
    navigation.navigate("Login");
  }
  const { setAToken, setRToken } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");
  async function crearUsuario() {
    try {
      const { data } = await axios.post("/auth/registro", {
        nombre,
        correo,
        clave,
      });
      if (data.error) {
        Alert.alert("Ferreteria Movil", data.error);
        return;
      }
      if (!data.accessToken && !data.refreshToken) {
        Alert.alert(
          "Ferreteria Movil",
          "Ha habido un error, vuelva a intentar"
        );
        return;
      }
      setAToken(data.accessToken);
      setRToken(data.refreshToken);

      navigation.navigate("Cart");
    } catch (error) {
      Alert.alert("Ferreteria Movil", error.message);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/helmet.png")}
      ></Image>

      <Text style={styles.logoText}>Login Bienvenido</Text>

      <Input value={nombre} onChangeText={setNombre} placeholder="Nombre" />
      <Input value={correo} onChangeText={setCorreo} placeholder="Correo" />

      <Input
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        password={true}
      />
      <Input
        value={clave2}
        onChangeText={setClave2}
        placeholder="Confimar Clave"
        password={true}
      />

      <TouchableOpacity style={styles.btn} onPress={crearUsuario}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={irALogin}>
        <Text>
          ¿Ya tienes una cuenta?{" "}
          <Text style={styles.txt}>Inicio de Sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: "100%",
    //justifyContent: 'center',
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    padding: 50,
    marginTop: 30,
  },
  logoText: {
    marginVertical: 15,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },

  btn: {
    width: "80%",
    backgroundColor: "#00388b",
    marginVertical: 30,
    paddingVertical: 20,
    borderRadius: 5,
    textAlign: "center",
    textShadowColor: "#191970",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  txt: {
    color: "#0080FF",
    fontWeight: "500",
  },
});
