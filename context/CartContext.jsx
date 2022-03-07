import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext({
  setCart(
    items = [] ||
      function (items = []) {
        return [];
      }
  ) {},
  cart: [],
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    let res = [];
    let string = await AsyncStorage.getItem("cart");
    if (string) {
      res = JSON.parse(string);
    }
    setCart(res);
  }

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
