import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { CartTotal } from "../components";
import { AuthContext } from "../context";
import {
  Cart,
  ProductoPage,
  Login,
  Registro,
  Perfil,
  RecuperarClave,
} from "../pages";
import { Home } from "./Home";

const Stack = createNativeStackNavigator();
export function Main() {
  const { isAuth } = useContext(AuthContext);
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
      {isAuth ? (
        <Stack.Group>
          <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="RecuperarClave" component={RecuperarClave} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
