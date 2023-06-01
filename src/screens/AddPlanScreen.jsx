import React from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { GenericInput } from "../components/GenericInput";
import { ImageContainer } from "../components/ImageContainer";
import { GenericButton } from "../components/GenericButton";
import { LinearGradient } from "expo-linear-gradient";

const AddPlanScreen = ({ imageSource }) => {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
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
        <GenericButton text={"Crear Plan"} />
      </View>
    </LinearGradient>
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

export default AddPlanScreen;
