
import { View, Text, TextInput, Image, TouchableOpacity,StyleSheet } from "react-native";

export function Registro({navigation}){
  function irALogin(){
    navigation.navigate("Login")
  }
  return <View style={styles.container} >
    <Image
        style={styles.logo}
        source={require("../assets/helmet.png")}
      ></Image>

      <Text style={styles.logoText}>Login Bienvenido</Text>

      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgb(0,0,0,0)"
        placeholder="Nombre"
        placeholderTextColor="#4b4b4b"
      ></TextInput>
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


      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={irALogin} >
      <Text style={styles.txtRgt}>
        ¿Ya tienes una cuenta? <Text style={styles.txt}>Inicio de Sesión</Text>
      </Text>

      </TouchableOpacity>      

  </View>
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