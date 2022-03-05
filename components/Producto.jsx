import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";

export function Producto({
  onPress,
  producto: { nombre, descripcion, stock, precio, imagenes },
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: imagenes[0].imagenUrl }} style={styles.img} />
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
