import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartTotal } from "../components";
import { Cart, ProductoPage, Login, Registro } from "../pages";
import { Home } from "./Home";

const Stack = createNativeStackNavigator();
export function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Cart"
        options={{
          headerRight: CartTotal,
        }}
        component={Cart}
      />
      <Stack.Screen name="Producto" component={ProductoPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
}
