import { View } from "react-native";
import { api_url } from "../App";
import axios from "axios";

function Registro() {
  async function enviardatos() {
    const { data } = await axios.post(api_url + "/auth/regitro", {
      nombre: "",
    });
  }
  // fetch(api_url, { method: "post",headers:{}, body: JSON.stringify({ nombre: "" }) });
  return <View></View>;
}
