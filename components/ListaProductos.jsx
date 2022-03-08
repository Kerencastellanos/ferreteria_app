import { View, FlatList } from "react-native";
import { uuid } from "../constantes";
import { Line } from "./Line";
import { Producto } from "./Producto";

export function ListaProductos({
  cart = false,
  prods = [],
  horizontal = false,
}) {
  return (
    <FlatList
      horizontal={horizontal}
      data={prods}
      keyExtractor={() => uuid()}
      ItemSeparatorComponent={!horizontal && Line}
      renderItem={({ item }) => (
        <Producto cart={cart} mini={horizontal} producto={item} />
      )}
    />
  );
}
