import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GenericInput } from "../components/GenericInput";
import { GenericButton } from "../components/GenericButton";
import { useNavigation } from "@react-navigation/native";
import { Navbar } from "../components/Navbar";

export default function LoginScreen() {
  const navigation = useNavigation();
  const handleSignup = () => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView style={styles.scroll}>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.text}>Nombre de Usuario</Text>
        <GenericInput />
        <Text style={styles.text}>Contraseña</Text>
        <GenericInput secureTextEntry={true} />

        <View style={styles.inputContainer}>
          <GenericButton text={"Iniciar Sesion"} />
          <Text style={styles.text}>
            ¿No tienes cuenta?
            <Text onPress={handleSignup}>
              <Text style={styles.text}> Crea una</Text>
            </Text>
          </Text>
          <Text></Text>
        </View>
        <View style={styles.inputContainer}>
          <GenericButton text={"Ingresar con Google"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: "10%",
    width: "70%",
  },
  scroll: {
    flex: 1,
    width: "100%",
    paddingTop: "10%",
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
  text2: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
