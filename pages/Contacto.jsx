import { TextInput, View, Text } from "react-native";
import { PrimaryButton } from "../components";
import { Entypo } from "@expo/vector-icons";
export function Contacto() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Nuestras Sucusarles:</Text>
      <Text>Telefono: 2863-4515</Text>
      <Text>Correo: ferreteriamovil@ferreteriamovil.com</Text>
      <Text>Redes Sociales:</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Entypo name="facebook" size={24} color="black" />
        <Entypo name="twitter" size={24} color="black" />
      </View>
      <TextInput
        style={{
          borderColor: "#gray",
          borderWidth: 1,
          borderRadius: 5,
          borderStyle: "solid",
          padding: 10,
          marginTop: 10,
        }}
        multiline={true}
        numberOfLines={25}
        placeholder="Envianos tus consultas  "
      />
      <PrimaryButton style={{ alignSelf: "center" }}>Enviar</PrimaryButton>
    </View>
  );
}
