import { FlatList, Text, StyleSheet, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListaProductos } from "../components";

export function HistorialCompras() {
  const [ventas, setVentas] = useState([]);
  const [prods, setProds] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/ventas");
      setVentas(data.ventas);
      setProds(data.ventas.map((v) => ({ cantidad: v.cantidad })));
      console.log("historial: ", data.ventas);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>HistorialCompras</Text>
      <ListaProductos cart={true} prods={prods} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
