import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawer, Logo } from "../components";
import { Productos, Contacto } from "../pages";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();
export function Home() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Contacto" component={Contacto}/>
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitle: () => <Logo />,
          headerRight: ({ }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
              style={{ marginEnd: 10 }}
            >
              <EvilIcons name="cart" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
        name="Productos"
        component={Productos}
      />
    </Drawer.Navigator>
  );
}

