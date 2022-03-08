import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer, initAuthValue } from "./AuthReducer";

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
    if (rToken && token) {
      const { data } = await axios.get("/auth/me", {
        headers: {
          Authentication: token,
        },
      });
      // token expiro
      if (data.error) {
        console.log("token expiro");
        // renovar token
        const { data } = await axios.post("/auth/refresh", {
          refreshToken: rToken,
        });
        if (data.error) {
          console.error(data.error);
          // refresh token es invalido
          dispatch({
            type: "both",
            payload: { rToken: "", token: "" },
          });
          return;
        }
        if (data.accessToken) {
          dispatch({
            type: "both",
            payload: { rToken, token: data.accessToken },
          });
        }
        return;
      }

      //token valido
      console.log("tokens ok");
      dispatch({
        type: "both",
        payload: { rToken, token },
      });
    }
  }

  useEffect(() => {
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
