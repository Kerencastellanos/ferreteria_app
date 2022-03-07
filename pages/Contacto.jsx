import { TextInput, View, Text } from "react-native";
import { PrimaryButton } from "../components";
export function Contacto() {
  return (
    <View style={{ padding: 10 }}>
      <Text>Nuestras Sucusarles:</Text>
      <Text>Telefono: 2863-4515</Text>
      <Text>Correo: ferreteriamovil@ferreteriamovil.com</Text>
      <Text>Redes Sociales:</Text>

      <TextInput
        multiline={true}
        numberOfLines={25}
        placeholder="Envianos tus consultas  "
      />
      <PrimaryButton style={{ alignSelf: "center" }}>Enviar</PrimaryButton>
    </View>
  );
}
