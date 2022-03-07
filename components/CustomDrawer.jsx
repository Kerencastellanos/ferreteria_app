import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import { Logo } from "./Logo";
import { AuthContext } from "../context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export function CustomDrawer(props) {
  const { isAuth, dispatch } = useContext(AuthContext);
  const { navigate } = useNavigation();
  function cerrarSession() {
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
          <DrawerItem label={"Perfil"} onPress={navegar("Perfil")} />
          <DrawerItem label={"Cerrar Session"} onPress={cerrarSession} />
        </>
      ) : (
        <DrawerItem label={"Iniciar Session"} onPress={navegar("Login")} />
      )}
    </DrawerContentScrollView>
  );
}
