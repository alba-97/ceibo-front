import React from "react";
import {
  View,
  Text,
  StyleSheet,
  
} from "react-native";
import { GenericInput } from "./GenericInput";
import { GenericButton } from "./GenericButton";

export const VistaLogin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre de Usuario</Text>
      <GenericInput />
      <Text style={styles.text}>Contraseña</Text>
      <GenericInput />

      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <GenericButton text={'Iniciar Sesion'}/>
        </View>
        <View style={styles.inputContainer}>
        <GenericButton text={'Home'}/>
        </View>
      </View>

      <Text style={styles.text}>No tienes cuenta? Crea una</Text>
      <GenericButton text={'Ingresar con Google'}/>
    </View>
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    paddingTop:'30%',
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,

  },
  text: {
    paddingTop: 10,
    paddingBottom:10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
});