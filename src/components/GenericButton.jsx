import { genericButtonStyle } from "../styles/buttons";
import { TouchableOpacity, Text } from "react-native";
import React from "react";

export const GenericButton = ({ onPress, style, textStyle, text }) => {
  return (
    <TouchableOpacity
      style={[genericButtonStyle.button, style]}
      onPress={onPress}
    >
      <Text style={[genericButtonStyle.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
