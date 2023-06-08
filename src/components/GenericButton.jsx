import { genericButtonStyle } from "../styles/buttons";
import { TouchableOpacity, Text } from "react-native";
import React from "react";

export const GenericButton = ({ onPress,  customStyle,text }) => {
  return (
    <TouchableOpacity style={[genericButtonStyle.button,customStyle ]} onPress={onPress}>
      <Text style={[genericButtonStyle.buttonText, customStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
