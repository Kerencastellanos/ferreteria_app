import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import { Logo } from "./Logo";

export function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Logo style={{ margin: 10 }}>
        <Text>Ferreteria Movil</Text>
      </Logo>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
