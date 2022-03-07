import axios from "axios";
import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { api_url } from "../constantes";
import { AuthContext } from "../context";

export function Registro({ navigation }) {
  function irALogin() {
    navigation.navigate("Login");
  }
  const { dispatch } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  async function crearUsuario() {
    try {
      const { data } = await axios.post(api_url + "/auth/registro", {
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
      dispatch({
        type: "both",
        payload: { token: data.accessToken, rToken: data.refreshToken },
      });
      navigation.navigate("Cart");
    } catch (error) {
      Alert.alert("Ferreteria Movil", error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/helmet.png")}
      ></Image>

      <Text style={styles.logoText}>Login Bienvenido</Text>

      <TextInput
        value={nombre}
        onChangeText={setNombre}
        style={styles.inputBox}
        underlineColorAndroid="rgb(0,0,0,0)"
        placeholder="Nombre"
        placeholderTextColor="#4b4b4b"
      ></TextInput>
      <TextInput
        value={correo}
        onChangeText={setCorreo}
        style={styles.inputBox}
        underlineColorAndroid="rgb(0,0,0,0)"
        placeholder="Correo"
        placeholderTextColor="#4b4b4b"
      ></TextInput>

      <TextInput
        value={clave}
        onChangeText={setClave}
        style={styles.inputBox}
        underlineColorAndroid="rgb(0,0,0,0)"
        placeholder="Clave"
        secureTextEntry={true}
        placeholderTextColor="#4b4b4b"
      ></TextInput>

      <TouchableOpacity style={styles.btn} onPress={crearUsuario}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={irALogin}>
        <Text style={styles.txtRgt}>
          ¿Ya tienes una cuenta?{" "}
          <Text style={styles.txt}>Inicio de Sesión</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: 'center',
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    padding: 50,
    marginTop: 130,
  },
  logoText: {
    marginVertical: 15,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  inputBox: {
    width: "80%",
    //textAlign:"center",
    //borderRadius: 15,
    backgroundColor: "#dddddd",
    paddingHorizontal: 19,
    paddingVertical: 15,
    fontSize: 18,
    color: "#1d1d1d",
    marginVertical: 10,
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
    fontWeight: "bold",
  },
  txt: {
    color: "#0080FF",
    fontWeight: "500",
  },
  txtRgt: {
    marginTop: 60,
  },
});
