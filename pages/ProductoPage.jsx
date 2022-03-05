import {
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import { useLayoutEffect } from "react";
const screen = Dimensions.get("window");
export function ProductoPage({ route, navigation }) {
  function Comprar() {
    if (true) {
      navigation.navigate("Login");
    }
  }
  const { nombre, descripcion, stock, precio, imagenes } = route.params;
  const IrACarrito = () => {
    navigation.navigate("Cart");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginEnd: 10 }} onPress={IrACarrito}>
          <EvilIcons name="cart" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={{}}
        decelerationRate={"fast"}
        snapToInterval={screen.width}
        snapToAlignment="center"
      >
        <Image source={{ uri: imagenes[0].imagenUrl }} style={styles.img} />
        <Image source={{ uri: imagenes[0].imagenUrl }} style={styles.img} />
        <Image source={{ uri: imagenes[0].imagenUrl }} style={styles.img} />
        <Image source={{ uri: imagenes[0].imagenUrl }} style={styles.img} />
        <Image source={{ uri: imagenes[0].imagenUrl }} style={styles.img} />
      </ScrollView>
      <View style={styles.info}>
        <Text style={styles.nombre}> {nombre}</Text>
        <Text> {descripcion}</Text>
        <Text style={styles.precio}>Lps.{precio}</Text>
        <Text>Disponibles: {stock}</Text>
        <TouchableOpacity onPress={Comprar} style={styles.btn}>
          <Text style={styles.white}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.purple}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: screen.width,
  },
  info: {
    flex: 1,
    alignItems: "center",
  },
  nombre: {
    fontSize: 20,
  },
  precio: {
    marginBottom: 15,
  },
  btn: {
    marginVertical: 10,
    width: "80%",
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: "#5448C8",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  btnOutline: {
    marginVertical: 10,
    width: "80%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#5448C8",
    paddingHorizontal: 9,
    paddingVertical: 14,
  },
  white: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  purple: {
    fontWeight: "bold",
    color: "#5448C8",
    textAlign: "center",
  },
});
