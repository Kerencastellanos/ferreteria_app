import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
export const api_url = "https://ferreteria-movil.herokuapp.com/api";

// import axios from "axios";
// axios.get(api_url + "/auth/me");

export default function App() {
  const [numero, setNumero] = useState(0);

  function incrementar() {
    setNumero(numero + 1);
  }
  const [respuesta, setRespuesta] = useState({});
  async function login() {
    const { data } = await axios.post("http://localhost:3000/api/login");
    setRespuesta(data);
  }
  return (
    <View style={styles.container}>
      <Text>{numero}</Text>
      <Button onPress={incrementar} title="incrementar numero" />
      <Text></Text>

      <Button onPress={() => alert("Hola mundo")} title="Hola" />
      <Text>{JSON.stringify(respuesta)}</Text>
      <Button onPress={login} title="login" />

      <StatusBar style="auto" />
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
});
