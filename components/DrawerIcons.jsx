import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export function ContactoIcon({ color = "", size = 24 }) {
  return <AntDesign name="contacts" size={size} color={color} />;
}

export function ProductosIcon({ color = "", size = 24 }) {
  return <AntDesign name="shoppingcart" size={size} color={color} />;
}

export function PerfilIcon({ color = "", size = 24 }) {
  return <MaterialIcons name="account-circle" size={size} color={color} />;
}

export function LoginIcon({ color = "", size = 24 }) {
  return <Entypo name="login" size={size} color={color} />;
}
export function LogoutIcon({ color = "", size = 24 }) {
  return <SimpleLineIcons name="logout" size={size} color={color} />;
}

export function HistorialIcon({ color = "", size = 24 }) {
  return <SimpleLineIcons name="handbag" size={size} color={color} />;
}
