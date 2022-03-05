import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Buscador, Producto } from "../components";
import axios from "axios";
import { api_url } from "../constantes";

function filterFun({ nombre }, buscar = "") {
  return nombre.toLowerCase().includes(buscar.toLowerCase());
}

export function Productos({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [prodsCopy, setProdsCopy] = useState([]);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    SolicitarProds();
  }, []);
  async function SolicitarProds() {
    const { data } = await axios.get(api_url + "/productos");
    setProductos(data);
    setProdsCopy(data);
  }

  useEffect(() => {
    if (!buscar) {
      setProductos(prodsCopy);
    }

    setProductos((p) => p.filter((e) => filterFun(e, buscar)));
  }, [buscar]);

  function verProducto(prod) {
    return (e) => {
      navigation.navigate("Producto", prod);
    };
  }

  return (
    <View style={styles.container}>
      <Buscador
        placeholder={"Buscar..."}
        value={buscar}
        onChangeText={setBuscar}
      />
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{ width: "100%", height: 2, backgroundColor: "#f3f3f3" }}
          />
        )}
        renderItem={({ item }) => (
          <Producto onPress={verProducto(item)} producto={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
