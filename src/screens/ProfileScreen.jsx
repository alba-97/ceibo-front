import React from "react";

import { View, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "../components/Navbar";
import LoginScreen from "./LoginScreen";
import {RegisterScreen} from './RegisterScreen'

export default function ProfileScreen() {

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <LoginScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
