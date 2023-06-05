import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GenericInput } from "../components/GenericInput";
import { GenericButton } from "../components/GenericButton";

export const RegisterScreen = () => {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.text}>Nombre de Usuario</Text>
        <GenericInput />
        <Text style={styles.text}>Contraseña</Text>
        <GenericInput secureTextEntry={true} />
        <Text style={styles.text}>Email</Text>
        <GenericInput />
        <Text style={styles.text}>Numero de telefono</Text>
        <GenericInput />

        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <GenericButton text={"Crear Cuenta"} />
          </View>
          <View style={styles.inputContainer}>
            <GenericButton text={"Home"} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    alignItems: "center",
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  container2: {
    paddingTop: "10%",
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
    paddingBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
});
