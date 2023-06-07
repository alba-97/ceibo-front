import { genericButtonStyle } from "../styles/buttons";
import { TouchableOpacity, Text } from "react-native";
import React from "react";

export const GenericButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={genericButtonStyle.button} onPress={onPress}>
      <Text style={genericButtonStyle.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
