import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
export function Input({
  keyboardType = "default",
  password = false,
  value,
  style,
  placeholder,
  onChangeText,
}) {
  const [secure, setSecure] = useState(password);
  function toggle() {
    setSecure((v) => !v);
  }
  return (
    <View style={[styles.box, style]}>
      <TextInput
        keyboardType={keyboardType}
        style={styles.input}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {password ? (
        <TouchableOpacity onPress={toggle}>
          <MaterialIcons name="visibility" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 20,
    flexGrow: 1,
  },
});
