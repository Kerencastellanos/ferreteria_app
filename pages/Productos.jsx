import { Text, ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Buscador, ListaProductos } from "../components";
import axios from "axios";
import { api_url } from "../constantes";

export function Productos() {
  const [msg, setMsg] = useState("");
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    SolicitarProds();
  }, []);
  async function SolicitarProds() {
    const { data } = await axios.get(api_url + "/productos");
    setProductos(data);
    setCargando(false);
  }

  async function onSubmitEditing() {
    setMsg(undefined);
    setCargando(true);
    const { data } = await axios.get(api_url + `/productos?nombre=${buscar}`);
    setProductos(data);
    setCargando(false);
    if (!data.length) {
      setMsg(`No se encontraron productos referentes a "${buscar}"`);
    }
  }

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={"#0000ff"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Buscador
        placeholder={"Buscar..."}
        value={buscar}
        onSubmitEditing={onSubmitEditing}
        onChangeText={setBuscar}
      />
      {msg ? (
        <Text style={{ textAlign: "center" }}>{msg}</Text>
      ) : (
        <ListaProductos prods={productos} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
