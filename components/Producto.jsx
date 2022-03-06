import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { defaultImage } from "../constantes";

export function Producto({ mini = false, producto }) {
  const navigation = useNavigation();
  const { nombre, descripcion, stock, precio, imagenes, categoria } = producto;
  function verProducto() {
    navigation.navigate("Producto", producto);
  }
  return (
    <TouchableOpacity
      onPress={verProducto}
      style={[styles.container, mini ? { flexDirection: "column" } : {}]}
    >
      <Image
        source={{
          uri: imagenes.length ? imagenes[0].url : defaultImage,
        }}
        style={styles.img}
      />
      {!mini ? (
        <View style={styles.info}>
          <Text>{nombre}</Text>
          <Text> {descripcion}</Text>
          <Text style={styles.precio}>Lps.{precio}</Text>
          <Text>Disponibles: {stock}</Text>
        </View>
      ) : (
        <Text>{nombre}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
  },
  info: {
    flex: 2,
  },
  precio: {
    marginBottom: 15,
  },
});
