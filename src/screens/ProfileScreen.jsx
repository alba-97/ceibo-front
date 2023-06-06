import React from "react";
import { View, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "../components/Navbar";

import {RegisterScreen} from './RegisterScreen'
const ProfileScreen = () => {
  const imageSource =
    "https://st2.depositphotos.com/1017732/9796/i/450/depositphotos_97968600-stock-photo-pensive-man-looking-at-the.jpg";
  const name = "Leon Stefano";
  const email = "leonstefano@gmail.com";
  const number = 1112345678;
  const userName = "ElLeonel";
  const address = "Una casa 123";
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <RegisterScreen/>
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
    color: "white",
  },
  // foto: {},
});

export default ProfileScreen;
