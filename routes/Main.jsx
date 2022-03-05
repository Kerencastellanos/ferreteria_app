import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart, ProductoPage } from "../pages";
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
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Producto" component={ProductoPage} />
    </Stack.Navigator>
  );
}
