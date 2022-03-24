import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, CartProvider } from "./context";
import { Main } from "./routes";
import axios from "axios";
// axios.defaults.baseURL = "https://ferreteria-movil.herokuapp.com/api";
axios.defaults.baseURL = "http://192.168.0.30:3030/api";
// axios.get(api_url + "/auth/me");

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <Main />
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
