import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { TextDeUsuario } from "./TextDeUsuario";
import { ImageContainer } from "./ImageContainer";
import { GenericInput } from "./GenericInput";
import { GenericButton } from "./GenericButton";

export const VistaAddEvent = ({ imageSource}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre</Text>
      <GenericInput />

      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput style={styles.input2} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora</Text>
          <TextInput style={styles.input2} />
        </View>
      </View>

      <Text style={styles.text}>Lugar</Text>
      <GenericInput />
      <Text style={styles.text}>Imagen</Text>
      <ImageContainer style={styles.foto} imageSource={imageSource} />
      < GenericButton text={'Crear Plan'}/>
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  label: {
    paddingTop: 10,
    marginBottom: 4,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input2: {
    width: "65%",
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  text: {
    paddingTop: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
});
