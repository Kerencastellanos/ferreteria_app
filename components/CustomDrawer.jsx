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
import { LoginIcon, LogoutIcon, PerfilIcon } from "./DrawerIcons";
import axios from "axios";

export function CustomDrawer(props) {
  const { isAuth, dispatch, token } = useContext(AuthContext);
  const { navigate } = useNavigation();
  async function cerrarSession() {
    const { data } = await axios.delete("/auth/logout", {
      headers: {
        Authentication: token,
      },
    });
    Alert.alert("Ferreteria Movil", data.error || data.msg);
    dispatch({
      type: "both",
      payload: { rToken: "", token: "" },
    });
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
