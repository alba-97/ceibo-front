import { TextInputMask } from "react-native-masked-text";
import { TextInput, StyleSheet } from "react-native";
import moment from "moment";
import React from "react";

export const GenericInput = ({ type, ...props }) => {
  if (type === "date") {
    const validateDate = (value, settings) => {
      return moment(value, "DD/MM/YYYY").isValid();
    };

    return (
      <TextInputMask
        type={"datetime"}
        options={{
          format: "DD/MM/YYYY",
          validator: validateDate,
        }}
        {...props}
        style={styles.input}
        placeholderTextColor="#999"
      />
    );
  }

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
    width: "80%",
  },
});
