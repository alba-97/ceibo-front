import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const GenericInput = ({ ...props }) => {
  return (
    <TextInput {...props} style={styles.input} placeholderTextColor="#999" />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#000",
    width: "80%", // ajusta el valor según tus necesidades
  },
});
