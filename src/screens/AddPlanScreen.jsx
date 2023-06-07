// Native
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View } from "react-native";
import { Image } from "react-native";
import React from "react";
// Components
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
// import noPlan from "../assets/noPlan.png";

export default function AddPlanScreen({ imageSource }) {
  const imgSrc = imageSource;
  //  || noPlan;
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
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
        <Image style={styles.foto} imageSource={imgSrc} />
        <GenericButton text={"Crear Plan"} />
      </View>
    </LinearGradient>
  );
}
