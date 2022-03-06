import { View, FlatList } from "react-native";
import { Line } from "./Line";
import { Producto } from "./Producto";

export function ListaProductos({ prods = [], horizontal = false }) {
  return (
    <View>
      <FlatList
        horizontal={horizontal}
        data={prods}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Line}
        renderItem={({ item }) => <Producto producto={item} />}
      />
    </View>
  );
}
