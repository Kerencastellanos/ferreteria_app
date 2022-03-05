import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./routes";
// import axios from "axios";
// axios.get(api_url + "/auth/me");

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
