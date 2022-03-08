import { TextInput, View, Text, ScrollView } from "react-native";
import { PrimaryButton } from "../components";
import { Entypo } from "@expo/vector-icons";
export function Contacto() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Nuestras Sucusarles:</Text>
      <Text>Telefono: 2863-4515</Text>
      <Text>Correo: ferreteriamovil@ferreteriamovil.com</Text>
      <Text>Redes Sociales:</Text>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-around",
        }}
      >
        <Entypo name="facebook" size={24} color="black" />
        <Entypo name="twitter" size={24} color="black" />
      </View>
      <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 5 }}>
        <TextInput
          style={{
            padding: 10,
          }}
          multiline={true}
          numberOfLines={25}
          placeholder="Envianos tus consultas  "
        />
      </View>
      <PrimaryButton style={{ alignSelf: "center" }}>Enviar</PrimaryButton>
    </ScrollView>
  );
}
