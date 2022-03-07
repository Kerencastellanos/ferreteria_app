import { initAuthValue } from "./AuthContext";

export function AuthReducer(prev = initAuthValue, { type = "", payload = {} }) {
  switch (type) {
    case "rtoken":
      return { ...prev, rtoken: payload.rtoken };

    case "token":
      return { ...prev, token: payload.token };

    case "isAuth":
      return { ...prev, isAuth: payload.isAuth };

    default:
      return prev;
  }
}
