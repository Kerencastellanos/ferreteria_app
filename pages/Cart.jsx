import { StyleSheet, View, Text, Button } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";
import { ListaProductos, PrimaryButton } from "../components";

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
      <ListaProductos prods={cart} />
      <PrimaryButton
        style={{
          width: "50%",
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        Terminar Compra
      </PrimaryButton>
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
