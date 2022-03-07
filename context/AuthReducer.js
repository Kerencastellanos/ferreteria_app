import { initAuthValue } from "./AuthContext";

export function AuthReducer(prev = initAuthValue, { type = "", payload = {} }) {
  switch (type) {
    case "both":
      return { ...prev, ...payload };
    case "rtoken":
      return { ...prev, ...payload };

    case "token":
      return { ...prev, ...payload };

    case "isAuth":
      return { ...prev, ...payload };

    default:
      return prev;
  }
}
