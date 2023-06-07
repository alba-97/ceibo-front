import React from "react";
import { View, Text } from "react-native";
import ProfileTextStyles from "../styles/ProfileTextStyles";

export const ProfileText = ({ text }) => {
  return (
    <View style={ProfileTextStyles.container}>
      <Text style={ProfileTextStyles.text}>{text}</Text>
    </View>
  );
};
