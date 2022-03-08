import { useContext, useMemo } from "react";
import { CartContext } from "../context";
import { Text, View } from "react-native";

function getTotal(cart) {
  let total = 0;
  total = cart.reduce((p, c) => p + Number(c.precio) * c.cantidad, 0);
  return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function CartTotal() {
  const { cart } = useContext(CartContext);
  // const [total] = useState(() => getTotal(cart));
  const total = useMemo(() => getTotal(cart), [cart]);
  if (!cart.length) {
    return <View />;
  }
  return <Text style={{ marginEnd: 10 }}>Total: {total}</Text>;
}
