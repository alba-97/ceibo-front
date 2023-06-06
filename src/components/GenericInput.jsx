import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const GenericInput = ({ ...props }) => {
  return (
    <TextInput {...props} style={styles.input} placeholderTextColor="#999" />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%", // ajusta el valor según tus necesidades
  },
});
