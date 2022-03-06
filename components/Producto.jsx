import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function Producto({
  producto: { nombre, descripcion, stock, precio, imagenes },
}) {
  const navigation = useNavigation();

  function verProducto() {
    navigation.navigate("Producto", {
      nombre,
      descripcion,
      stock,
      precio,
      imagenes,
    });
  }
  return (
    <TouchableOpacity onPress={verProducto} style={styles.container}>
      <Image source={{ uri: imagenes[0].url }} style={styles.img} />
      <View style={styles.info}>
        <Text>{nombre}</Text>
        <Text> {descripcion}</Text>
        <Text style={styles.precio}>Lps.{precio}</Text>
        <Text>Disponibles: {stock}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
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
