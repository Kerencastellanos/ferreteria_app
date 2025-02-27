import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";
import { ListaProductos, PrimaryButton } from "../components";

export function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <ListaProductos prods={cart} />
      {cart.length ? (
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
      ) : (
        <View>
          <Text>Aun no tienes productos agregados</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
