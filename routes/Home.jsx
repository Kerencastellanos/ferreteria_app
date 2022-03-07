import { createDrawerNavigator } from "@react-navigation/drawer";
import { CartIcon, CustomDrawer, Logo } from "../components";
import { Productos, Contacto } from "../pages";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();
export function Home() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen name="Contacto" component={Contacto}/> */}
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitle: () => <Logo />,
          headerRight: CartIcon,
        })}
        name="Productos"
        component={Productos}
      />
    </Drawer.Navigator>
  );
}
