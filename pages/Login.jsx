import { FlatList, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
//import { Input, CheckBox, Image, Text } from "react-native-elements";
import { Buscador, Producto } from "../components";
import axios from "axios";
import { api_url } from "../constantes";

export function Login() {
  /*const [Usuario, setUsuario] = useState(null)
    const [Contraseña, setContraseña] = useState(null)
    const { signIn } = useContext(AuthContext)

    const [ocultarPass, setOcultarPass] = useState(true)

    //Función del login que llamo de la navegación
    const loginHandle = async (username, password) => {
        if (!username || !password) {
        Alert.alert('Debe ingresar los datos completos')
        } else {
        const lging = await signIn(username, password)
        if (lging) {
            if (lging.error != "") {
            Alert.alert(lging.msj)
            }
        }
        }
    }
    */
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/helmet.png")}
      ></Image>

      <Text style={styles.logoText}>Login Bienvenido</Text>

      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgb(0,0,0,0)"
        placeholder="Correo"
        placeholderTextColor="#4b4b4b"
      ></TextInput>

      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgb(0,0,0,0)"
        placeholder="Clave"
        secureTextEntry={true}
        placeholderTextColor="#4b4b4b"
      ></TextInput>

      <Text style={styles.txt}>¿Olvide mi contraseña?</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.txtRgt}>
        ¿No tienes una cuenta? <Text style={styles.txt}>Registrate</Text>
      </Text>
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
