import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CartIcon,
  Input,
  ListaProductos,
  MyImageSlider,
  PrimaryButton,
} from "../components";
import { api_url } from "../constantes";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import axios from "axios";
import { AuthContext, CartContext } from "../context";
const screen = Dimensions.get("window");

export function ProductoPage({ route, navigation }) {
  const { id, nombre, descripcion, stock, precio, imagenes, categoria } =
    route.params;

  const { cart, setCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState("");
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
  const { isAuth } = useContext(AuthContext);
  function Comprar() {
    if (!addToCart()) {
      return;
    }
    if (!isAuth) {
      navigation.navigate("Login");
      return;
    }
    navigation.navigate("Cart");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
    });
  }, []);

  function addToCart() {
    if (Number(cantidad) > stock) {
      Alert.alert(
        "Ferreteria Movil",
        `Solo hay ${stock} unidades de este producto `
      );
      return false;
    }
    let item = cart.find((e) => e.id == id);
    if (item) {
      setCart((items) =>
        items.map((e) => {
          if (e.id == item.id) {
            e.cantidad += Number(cantidad) || 1;
          }
          return e;
        })
      );
      return true;
    }
    setCart((items) =>
      items.concat({ ...route.params, cantidad: Number(cantidad) || 1 })
    );
    return true;
  }

  return (
    <ScrollView>
      <MyImageSlider images={[...imagenes, ...imagenes, ...imagenes]} />
      <View style={styles.info}>
        <Text style={styles.nombre}> {nombre}</Text>
        <Text> {descripcion}</Text>
        <Text style={styles.precio}>Lps.{precio}</Text>
        <Text>Disponibles: {stock}</Text>
        <Input
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
          style={{ backgroundColor: "#fff" }}
          placeholder={"Cantidad a Comprar"}
        />
        <PrimaryButton onPress={Comprar}>Comprar</PrimaryButton>
        <TouchableOpacity onPress={() => addToCart()} style={styles.btnOutline}>
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
