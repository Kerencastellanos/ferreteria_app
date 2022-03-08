import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";
import { ListaProductos } from "../components";

export function Cart() {
  const { cart, setCart } = useContext(CartContext);
  if (!cart.length) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center" }}>
          Aun no tienes productos agregados
        </Text>
      </View>
    );
  }

  function borratTodo() {
    setCart([]);
  }

  return (
    <View style={styles.container}>
      <Button title="Borrar Todo" onPress={borratTodo} color={"#ff5e5e"} />

      <ListaProductos cart={true} prods={cart} />
      <TouchableOpacity style={{ backgroundColor: "#3b82f6", padding: 15 }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Terminar Compra
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
