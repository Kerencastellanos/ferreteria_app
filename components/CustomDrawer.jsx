import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, Alert } from "react-native";
import { Logo } from "./Logo";
import { AuthContext } from "../context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  HistorialIcon,
  LoginIcon,
  LogoutIcon,
  PerfilIcon,
} from "./DrawerIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CustomDrawer(props) {
  const { isAuth, setRToken, setAToken } = useContext(AuthContext);
  const { navigate } = useNavigation();
  async function cerrarSession() {
    const { data } = await axios.delete("/auth/logout");
    Alert.alert("Ferreteria Movil", data.error || data.msg);
    await AsyncStorage.removeItem("aToken");
    await AsyncStorage.removeItem("rToken");
    setRToken("");
    setAToken("");
  }
  function navegar(screen = "") {
    return (e) => {
      navigate(screen);
    };
  }

  return (
    <DrawerContentScrollView {...props}>
      <Logo style={{ margin: 10, marginBottom: 50 }}>
        <Text>Ferreteria Movil</Text>
      </Logo>
      <DrawerItemList {...props} />
      {isAuth ? (
        <>
          <DrawerItem
            label={"Perfil"}
            onPress={navegar("Perfil")}
            icon={PerfilIcon}
          />
          <DrawerItem
            label={"Historial Compras"}
            onPress={navegar("Historial")}
            icon={HistorialIcon}
          />
          <DrawerItem
            label={"Cerrar Session"}
            onPress={cerrarSession}
            icon={LogoutIcon}
          />
        </>
      ) : (
        <DrawerItem
          label={"Iniciar Session"}
          onPress={navegar("Login")}
          icon={LoginIcon}
        />
      )}
    </DrawerContentScrollView>
  );
}
