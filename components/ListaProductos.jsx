import { View, FlatList } from "react-native";
import { uuid } from "../constantes";
import { Line } from "./Line";
import { Producto } from "./Producto";

export function ListaProductos({ prods = [], horizontal = false }) {
  return (
    <FlatList
      horizontal={horizontal}
      data={prods}
      keyExtractor={() => uuid()}
      ItemSeparatorComponent={!horizontal && Line}
      renderItem={({ item }) => <Producto mini={horizontal} producto={item} />}
    />
  );
}
