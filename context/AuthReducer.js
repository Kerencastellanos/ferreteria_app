export const initAuthValue = {
  token: "",
  rToken: "",
  isAuth: false,
  usuario: {},
};
export function AuthReducer(prev = initAuthValue, { type = "", payload = {} }) {
  switch (type) {
    case "both":
      return { ...prev, ...payload };

    case "isAuth":
      return { ...prev, ...payload };

    default:
      return prev;
  }
}
