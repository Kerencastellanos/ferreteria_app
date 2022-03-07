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
  const { isAuth } = useContext(AuthContext);
  const { navigate } = useNavigation();

  function navegar(screen = "") {
    return (e) => {
      navigate(screen);
    };
  }

  return (
    <DrawerContentScrollView {...props}>
      <Logo style={{ margin: 10 }}>
        <Text>Ferreteria Movil</Text>
      </Logo>
      {isAuth ? (
        <DrawerItem label={"Perfil"} onPress={navegar("Perfil")} />
      ) : (
        <DrawerItem label={"Iniciar Session"} onPress={navegar("Login")} />
      )}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
