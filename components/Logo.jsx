import { View, Image } from "react-native";
import helmet from "../assets/helmet.png";
export function Logo({ style, children }) {
  return (
    <View style={style}>
      <Image source={helmet} style={{ width: 30, height: 30 }} />
      {children}
    </View>
  );
}
