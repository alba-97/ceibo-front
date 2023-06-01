import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./appCss";
// import { GenericInput } from './components/TextInput';
// import { ImageContainer } from './components/ImageContainer';
// import { TextDeUsuario } from './components/TextDeUsuario';
// import { FotoDeUsuario } from './components/FotoDeUsuario';
// import Calendar from './components/Calendar';
export default function App() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
    </LinearGradient>
  );
}
