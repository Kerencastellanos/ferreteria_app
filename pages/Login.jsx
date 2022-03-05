import { View,Text, TextInput } from "react-native";

export function Login() {
    return <View>
        <Text>Login</Text>
        <TextInput placeholder="correo"></TextInput>
        <TextInput placeholder="clave" style={{padding:15}}></TextInput>
    </View>    
}