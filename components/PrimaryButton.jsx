import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function PrimaryButton({ style, onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <Text style={styles.white}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginVertical: 10,
    width: "80%",
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: "#5448C8",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  white: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  hola: {},
});
