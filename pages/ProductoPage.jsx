import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CartIcon,
  ListaProductos,
  MyImageSlider,
  PrimaryButton,
} from "../components";
import { api_url } from "../constantes";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import axios from "axios";
import { CartContext } from "../context";
const screen = Dimensions.get("window");

export function ProductoPage({ route, navigation }) {
  const { nombre, descripcion, stock, precio, imagenes, categoria } =
    route.params;

  const { setCart } = useContext(CartContext);

  useEffect(() => {
    obtenerProds();
  }, []);

  const [prodsCategoria, setProdsCategoria] = useState([]);

  async function obtenerProds() {
    const { data } = await axios.get(
      api_url + `/productos?categoria=${categoria.nombre}`
    );
    if (data.length) {
      setProdsCategoria(data);
    }
  }

  function Comprar() {
    addToCart();
    if (true) {
      navigation.navigate("Login");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
    });
  }, []);

  function addToCart() {
    setCart((items) => items.concat(route.params));
  }

  return (
    <ScrollView>
      <MyImageSlider images={[...imagenes, ...imagenes, ...imagenes]} />
      <View style={styles.info}>
        <Text style={styles.nombre}> {nombre}</Text>
        <Text> {descripcion}</Text>
        <Text style={styles.precio}>Lps.{precio}</Text>
        <Text>Disponibles: {stock}</Text>
        <PrimaryButton onPress={Comprar}>Comprar</PrimaryButton>
        <TouchableOpacity onPress={addToCart} style={styles.btnOutline}>
          <Text style={styles.purple}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.nombre}>Productos Relacionados </Text>
        <ListaProductos horizontal={true} prods={prodsCategoria} />
      </View>
    </ScrollView>
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
  relacionados: {
    margin: 10,
  },
  nombre: {
    fontSize: 20,
    margin: 10,
  },
  precio: {
    marginBottom: 15,
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
