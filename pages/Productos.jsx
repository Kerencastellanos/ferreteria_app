import { Text, ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Buscador, ListaProductos } from "../components";
import axios from "axios";

export function Productos() {
  const [msg, setMsg] = useState("");
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    SolicitarProds();
  }, []);
  async function SolicitarProds() {
    try {
      const { data } = await axios.get("/productos");
      setProductos(data);
      setMsg("");
    } catch (error) {
      console.log(error);
      setMsg(error.message);
    }
    setCargando(false);
  }

  async function onSubmitEditing() {
    setMsg(undefined);
    setCargando(true);
    try {
      const { data } = await axios.get(`/productos?nombre=${buscar}`);
      setProductos(data);
      setMsg("");
      if (!data.length) {
        setMsg(`No se encontraron productos referentes a "${buscar}"`);
      }
    } catch (error) {
      setMsg(error.message);
    }
    setCargando(false);
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
