import ProfileTextStyles from "../styles/ProfileTextStyles";
import { View, Text } from "react-native";
import React from "react";

export const ProfileText = ({ text }) => {
  return (
    <View style={ProfileTextStyles.container}>
      <Text style={ProfileTextStyles.text}>{text}</Text>
    </View>
  );
};
