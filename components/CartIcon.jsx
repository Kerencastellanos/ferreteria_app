import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";
import { CartContext } from "../context";

export function CartIcon() {
  const { navigate } = useNavigation();
  const { cart } = useContext(CartContext);
  function IrACarrito() {
    navigate("Cart");
  }
  return (
    <TouchableOpacity style={{ marginEnd: 10 }} onPress={IrACarrito}>
      <Text style={{ alignSelf: "flex-end" }}>{cart.length}</Text>
      <EvilIcons name="cart" size={24} color="black" />
    </TouchableOpacity>
  );
}
