export const api_url = "https://ferreteria-movil.herokuapp.com/api";
export const defaultImage =
  "https://cdn-icons.flaticon.com/png/512/4725/premium/4725478.png?token=exp=1646604372~hmac=9f1eabd8ca8743289ec48c160cb9fccc";

export function uuid() {
  const { random } = Math;
  return `${random() * 10000}${Date.now()}`;
}

export function compareObjs(obj1 = { name: "name" }, obj2 = { name: "name" }) {
  let res = true;
  Object.keys(obj1).forEach((k) => {
    if (obj1[k] != obj2[k]) {
      res = false;
      return res;
    }
  });
  return res;
}
