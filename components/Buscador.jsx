import { TouchableOpacity, StyleSheet, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export function Buscador({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.box}>
      <EvilIcons name="search" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType="web-search"
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={() => onChangeText("")}>
        <EvilIcons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    margin: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flexGrow: 1,
    padding: 5,
  },
});
