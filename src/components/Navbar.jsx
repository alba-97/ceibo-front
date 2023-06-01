import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export const Navbar = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EL CLUB DEL FUCKING PLAN</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: "100%",
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
