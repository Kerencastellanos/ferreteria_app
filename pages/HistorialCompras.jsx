/**
 * @typedef {import("../components/Producto").IProducto} IProducto
 * @typedef {{ detalles:Detalle[],fecha:string }} Venta
 * @typedef {{ cantidad:number,precio:number,producto:Producto }} Detalle
 * @typedef {{ id:number,imagenes:Imagen[],nombre:string }} Producto
 * @typedef {{ url:string }} Imagen
 * @typedef {{ data:{ventas:Venta[]} }} Res
 */

import { Text, StyleSheet, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListaProductos } from "../components";

export function HistorialCompras() {
  const [msg, setMsg] = useState("");
  /**
   * @type [ventas:Venta[],setVentas:Function]
   */
  const [ventas, setVentas] = useState([]);
  /**
   * @type [prods:IProducto[],setProds:(prods:IProducto[] | ((prods:IProducto[])=>IProducto[]))=>void]
   */
  const [prods, setProds] = useState([]);
  const [cargando, setCargando] = useState(false);
  async function solicitarVentas() {
    /**
     * @type Res
     */
    let { data } = await axios.get("/ventas");
    if (!data.ventas.length) {
      setMsg("Aun no ha realizado compras");
      return;
    }
    setMsg("");
    setVentas(data.ventas);
    setProds([]);

    data.ventas.forEach((v) => {
      let detalles = v.detalles.map((d) => ({
        id: d.producto.id,
        cantidad: d.cantidad,
        imagenes: d.producto.imagenes,
        precio: d.precio,
        nombre: d.producto.nombre,
        fecha: v.fecha,
      }));
      setProds((prev) => prev.concat(detalles));
    });

    console.log("historial: ", data.ventas);
  }
  useEffect(() => {
    solicitarVentas();
  }, []);

  useEffect(() => {
    console.log("prods:");
    console.log(prods);
  }, [prods]);
  if (msg) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{msg}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ListaProductos
        cart={true}
        prods={prods}
        enabled={false}
        cargando={cargando}
        onRefresh={solicitarVentas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
