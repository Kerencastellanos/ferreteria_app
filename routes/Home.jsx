import { createDrawerNavigator } from "@react-navigation/drawer";
import { CartIcon, CustomDrawer, Logo } from "../components";
import { Productos, Contacto } from "../pages";

const Drawer = createDrawerNavigator();
export function Home() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          headerTitle: () => <Logo />,
          headerRight: CartIcon,
        }}
        name="Productos"
        component={Productos}
      />
      <Drawer.Screen name="Contacto" component={Contacto} />
    </Drawer.Navigator>
  );
}
