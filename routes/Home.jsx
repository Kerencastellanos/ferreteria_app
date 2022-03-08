import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  CartIcon,
  ContactoIcon,
  CustomDrawer,
  Logo,
  ProductosIcon,
} from "../components";
import { Productos, Contacto } from "../pages";
const Drawer = createDrawerNavigator();
export function Home() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          headerTitle: () => <Logo />,
          headerRight: () => <CartIcon />,
          drawerIcon: ProductosIcon,
        }}
        name="Productos"
        component={Productos}
      />
      <Drawer.Screen
        options={{ drawerIcon: ContactoIcon }}
        name="Contacto"
        component={Contacto}
      />
    </Drawer.Navigator>
  );
}
