/**
 * @typedef {{ detalles:Detalle[] }} Venta
 * @typedef {{ cantidad:number,precio:number,producto:Producto }} Detalle
 * @typedef {{ imagenes:Imagen[],nombre:string }} Producto
 * @typedef {{ url:string }} Imagen
 * @typedef {{ data:{ventas:Venta[]} }} Res
 */

import { FlatList, Text, StyleSheet, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListaProductos } from "../components";

export function HistorialCompras() {
  /**
   * @type [ventas:Venta[]]
   */
  const [ventas, setVentas] = useState([]);
  const [prods, setProds] = useState([]);
  useEffect(() => {
    (async () => {
      /**
       * @type Res
       */
      let { data } = await axios.get("/ventas");
      setVentas(data.ventas);
      setProds(
        data.ventas.map((v, i) => ({
          cantidad: v.detalles[i].cantidad,
          images: v.image,
        }))
      );
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
