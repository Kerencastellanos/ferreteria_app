import {
  Alert,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Input, PrimaryButton } from "../components";
import axios from "axios";

export function RecuperarClave({ route, navigation }) {
  const [pinEnviado, setPinEnviado] = useState(false);
  const [pinVerificado, setPinVerificado] = useState(false);
  const [correo, setCorreo] = useState(route.params || "");
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");

  function togglePinEnviado(value = false) {
    return (e) => {
      setPinEnviado(value);
    };
  }

  const [pin, setPin] = useState("");
  async function cambiarClave() {
    if (clave == clave2) {
      const { data } = await axios.post("/auth/clave", { pin, clave, correo });

      Alert.alert("Ferreteria movil", data.error || data.msg);
      if (data.error) {
        setPinEnviado(false);
        setPinVerificado(false);
        setPin(0);
      }
      if (data.msg) {
        navigation.navigate("Login");
      }
      return;
    }
    Alert.alert("Ferreteria movil", "Las claves no coinciden ");
  }
  async function verificarPin() {
    if (pin) {
      setCargando(true);
      const { data } = await axios.post("/auth/pin", { pin, correo });
      setCargando(false);
      if (data.error) {
        Alert.alert("Ferreteria movil", data.error);
        return;
      }
      if (data.msg) {
        setPinVerificado(true);
      }
      return;
    }
    Alert.alert("Ferreteria movil", "ingrese el pin");
  }

  async function enviarPin() {
    if (correo) {
      try {
        setCargando(true);
        const { data } = await axios.post("/auth/recuperar", {
          correo,
        });
        setCargando(false);
        if (data.error) {
          Alert.alert("Ferreteria movil", data.error);
          return;
        }
        if (data.msg) {
          setPinEnviado(true);
          return;
        }
        Alert.alert("Ferreteria movil", "Ups ha habido un error");
      } catch (error) {
        Alert.alert("Ferreteria movil", error.message);
      }

      return;
    }
    Alert.alert("Ferreteria movil", "ingrese un correo");
  }

  if (pinVerificado) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Establesca una nueva contraseña</Text>
        <Input
          value={clave}
          password={true}
          onChangeText={setClave}
          placeholder={"Nueva Clave"}
        />

        <Input
          value={clave2}
          onChangeText={setClave2}
          password={true}
          placeholder={"Confirmar Clave"}
        />
        <PrimaryButton onPress={cambiarClave} style={styles.btn}>
          Cambiar Clave{" "}
        </PrimaryButton>
      </View>
    );
  }
  const [cargando, setCargando] = useState(false);
  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }
  if (pinEnviado) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Ingrese el pin de recuperacion que recibio en su correo
        </Text>
        <Input
          keyboardType="numeric"
          value={pin}
          onChangeText={setPin}
          placeholder={"pin"}
        />

        <PrimaryButton onPress={verificarPin} style={styles.btn}>
          Verificar Pin
        </PrimaryButton>
        <TouchableOpacity onPress={togglePinEnviado(false)}>
          <Text
            style={{
              color: "#3b82f6",
              borderBottomColor: "#3b82f6",
              borderBottomWidth: 1,
            }}
          >
            Obtener otro pin
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Se le enviara un pin de recuperacion a su correo
      </Text>
      <Input
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
        placeholder={"correo"}
      />
      <PrimaryButton onPress={enviarPin} style={styles.btn}>
        Enviar pin{" "}
      </PrimaryButton>
      <TouchableOpacity onPress={togglePinEnviado(true)}>
        <Text
          style={{
            color: "#3b82f6",
            borderBottomColor: "#3b82f6",
            borderBottomWidth: 1,
          }}
        >
          Ya tengo un pin
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    padding: 20,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    color: "gray",
    marginBottom: 15,
  },
  btn: {
    width: "50%",
  },
});
