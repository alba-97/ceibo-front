import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./appCss";
import { GenericInput } from "./components/TextInput";
import { ImageContainer } from "./components/ImageContainer";
import { TextDeUsuario } from "./components/TextDeUsuario";
import { FotoDeUsuario } from "./components/FotoDeUsuario";
import { Navbar } from "./components/Navbar";
export default function App() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
    <View style={styles.container}>
      <Navbar />

      <ImageContainer
        imageSource="https://www.billboard.com/wp-content/uploads/2022/09/bad-bunny-press-credit-eric-rojas-2022-billboard-2-1548.jpg?w=942&h=623&crop=1"
        date="28 de mayo de 2023"
        event="Conejo malo"
      />
      <GenericInput
      // otras propiedades
      />

      <TextDeUsuario text="Leon Stefano" />

      <FotoDeUsuario imageSource="https://st2.depositphotos.com/1017732/9796/i/450/depositphotos_97968600-stock-photo-pensive-man-looking-at-the.jpg" />

      <StatusBar style="auto" />
    </View>
     </LinearGradient>
  );
}
