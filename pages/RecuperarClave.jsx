import { Alert, TextInput, Text, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Input, PrimaryButton } from "../components";
import axios from "axios";

export function RecuperarClave({ route }) {
  const [pinenviado, setPinenviado] = useState(false);
  const [correo, setCorreo] = useState(route.params.correo || "");
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");

  const [pin, setPin] = useState(0);
  function verificarPin() {
    if (pin) {
      axios.post("/auth/clave");
      return;
    }
    Alert.alert("Ferreteria movil", "ingrese el pin");
  }

  async function enviarPin() {
    if (correo) {
      try {
        const { data } = await axios.post("/auth/recuperar", {
          correo,
        });
        if (data.error) {
          Alert.alert("Ferreteria movil", data.error);
          return;
        }
        if (data.msg) {
          Alert.alert("Ferreteria movil", data.msg);
          setPinenviado(true);
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

  if (pinenviado) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Ingrese el pin de recuperacion que recibio en su correo
        </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          placeholder={"pin"}
        />
        <Input
          style={styles.input}
          value={clave}
          onChangeText={setClave}
          placeholder={"Nueva Clave"}
        />

        <Input
          value={clave2}
          onChangeText={setClave2}
          placeholder={"Confirmar Clave"}
        />
        <PrimaryButton onPress={verificarPin} style={styles.btn}>
          Cambiar Clave
        </PrimaryButton>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Se le enviara un pin de recuperacion a su correo
      </Text>
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder={"correo"}
      />
      <PrimaryButton onPress={enviarPin} style={styles.btn}>
        Enviar pin{" "}
      </PrimaryButton>
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
