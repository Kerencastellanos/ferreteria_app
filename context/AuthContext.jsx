import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "./AuthReducer";

export const initAuthValue = { token: "", rToken: "", isAuth: false };

const initContextValue = {
  dispatch({ type = "", payload = {} }) {
    return initAuthValue;
  },
  ...initAuthValue,
};

export const AuthContext = createContext(initContextValue);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initAuthValue);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadTokens();
  }, []);

  async function loadTokens() {
    const rToken = await AsyncStorage.getItem("rToken");
    const token = await AsyncStorage.getItem("token");
    setLoaded(true);
    console.log("loadTokens: ", rToken, token);
    if (rToken && token) {
      dispatch({ type: "both", payload: { rToken, token } });
    }
  }

  useEffect(() => {
    console.log("tokens update");
    dispatch({
      type: "isAuth",
      payload: { isAuth: state.rToken && state.token },
    });
    if (loaded) {
      AsyncStorage.setItem("rToken", state.rToken);
      AsyncStorage.setItem("token", state.token);
    }
  }, [state.rToken, state.token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
