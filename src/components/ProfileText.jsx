import { styles } from "../styles/ProfileTextStyles";
import { View, Text } from "react-native";
import React from "react";

export const ProfileText = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
