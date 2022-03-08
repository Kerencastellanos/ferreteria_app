import {
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { useState, useContext } from "react";
import { CartContext } from "../context";
export function Producto({ cart = false, mini = false, producto }) {
  const { setCart } = useContext(CartContext);
  const navigation = useNavigation();
  const { id, cantidad, nombre, descripcion, stock, precio, imagenes } =
    producto;
  function verProducto() {
    navigation.navigate("Producto", producto);
  }
  const [cant, setCant] = useState(() => String(cantidad) || 1);
  function removerDecart() {
    Alert.alert("Ferreteria Movil", "Eliminar?", [
      { text: "No" },
      {
        text: "Si",
        onPress() {
          setCart((items) => items.filter((i) => i.id != id));
        },
      },
    ]);
  }
  if (cart) {
    return (
      <View style={[styles.container, mini ? { flexDirection: "column" } : {}]}>
        <TouchableOpacity onPress={verProducto}>
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
        </TouchableOpacity>
        {!mini ? (
          <View style={styles.info}>
            <Text>{nombre}</Text>
            <Text> {descripcion}</Text>
            <Text style={styles.precio}>Lps.{precio}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TextInput
                style={{ padding: 5, backgroundColor: "#f3f3f3" }}
                keyboardType="numeric"
                placeholder="Cantidad"
                value={cant}
                onChangeText={setCant}
              />
              <TouchableOpacity onPress={removerDecart}>
                <AntDesign name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text>{nombre}</Text>
        )}
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.container, mini ? { flexDirection: "column" } : {}]}
      onPress={verProducto}
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
