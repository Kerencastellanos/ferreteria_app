import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, CheckBox, Image, Text } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("screen");
import logo from '../Public/LogoAdmin.png'

import { AuthContext } from '../provider/context';

export default function Registro({ navigation }) {
  const [nombre, setNombreCompleto] = useState("")
  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  

  const [ocultarPass, setOcultarPass] = useState(true)

  const { signUp } = useContext(AuthContext)

  const preSignUp = async () => {
    if (!nombre || !correo || !clave) {
      Alert.alert("Llene todos los campos")
      return
    }
    const lging = await signUp(nombre, correo, clave)
    if (lging) {
      if (lging.error != "") {
        Alert.alert(lging.msj)
      }
    }
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>

        <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
          <Image source={logo} style={{ resizeMode: 'contain', width: width - 30, height: 200 }} />
        </View>

        <View style={styles.view1}>
          <View>
            <Input placeholder=' Nombre Completo' value={nombre} onChangeText={setNombreCompleto} leftIcon={<Icon size={25} name="user" />} />
            <Input placeholder=' Correo Electronico' value={correo} onChangeText={setCorreo} leftIcon={<Icon size={25} name="at" />} />
            <Input placeholder=' Contraseña' value={clave} onChangeText={setClave} onChangeText={setClave} rightIcon={
              <Icon
                name={ocultarPass ? 'eye-slash' : 'eye'}
                size={25}
                color="black"
                onPress={() => setOcultarPass(!ocultarPass)}
              />
            }
              secureTextEntry={ocultarPass ? true : false} leftIcon={<Icon size={25} name="lock" />} />    
              <TextInput secureTextEntry={true}> </TextInput>        
          </View>

          <TouchableOpacity style={styles.boton} onPress={() => preSignUp()}>
            <Text style={styles.textoBoton}> Confirmar </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#170055',
  },
  boton: {
    elevation: 8,
    backgroundColor: "#07689F",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#161E54",
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    marginTop: 1,
  },
  textoBoton: {
    fontSize: 16,
    color: "#fff",
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  view1: {
    backgroundColor: '#FAFAFA',
    flex: 2,
    padding: 20,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15
  },
});
