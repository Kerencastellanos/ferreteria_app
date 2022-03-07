import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer, useEffect } from "react";
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
  useEffect(() => {
    dispatch({
      type: "isAuth",
      payload: { isAuth: state.rToken && state.token },
    });

    AsyncStorage.setItem("rToken", state.rToken);
    AsyncStorage.setItem("token", state.token);
  }, [state.rToken, state.token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
