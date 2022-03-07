import { AntDesign } from "@expo/vector-icons";

export function ContactoIcon({ color = "", size = 24 }) {
  return <AntDesign name="contacts" size={size} color={color} />;
}

export function ProductosIcon({ color = "", size = 24 }) {
  return <AntDesign name="shoppingcart" size={size} color={color} />;
}
