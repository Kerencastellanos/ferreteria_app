import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context";

export function CartIcon() {
  const { navigate } = useNavigation();
  const { cart } = useContext(CartContext);
  function IrACarrito() {
    navigate("Cart");
  }
  return (
    <TouchableOpacity
      style={{
        position: "relative",
        marginEnd: 10,
      }}
      onPress={IrACarrito}
    >
      <Text
        style={{
          top: -10,
          right: -10,
          position: "absolute",
          backgroundColor: "red",
          color: "white",
          borderRadius: 50,
          textAlign: "center",
          width: 20,
          height: 20,
        }}
      >
        {cart.length}
      </Text>
      <EvilIcons name="cart" size={24} color="black" />
    </TouchableOpacity>
  );
}
