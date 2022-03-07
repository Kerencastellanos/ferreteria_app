import { StyleSheet, View, Text } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";
import { ListaProductos, PrimaryButton } from "../components";

export function Cart() {
  const { cart } = useContext(CartContext);
  if (!cart.length) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center" }}>
          Aun no tienes productos agregados
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
