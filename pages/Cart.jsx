import { Text, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";
import { ListaProductos } from "../components";

export function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <ListaProductos prods={cart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
