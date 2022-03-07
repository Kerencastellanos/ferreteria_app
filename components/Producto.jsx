import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

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
      {imagenes.length ? (
        <Image
          source={{
            uri: imagenes[0].url,
          }}
          style={styles.img}
        />
      ) : (
        <AntDesign name="unknowfile1" size={150} color="black" />
      )}
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
