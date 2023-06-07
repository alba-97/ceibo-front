// Native
import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
// Components
import { formatDate } from "../services/formatDate";
import styles from "../styles/ImageContainerStyles";

export const ImageContainer = ({ plan, onPress }) => {
  const handlePress = (prop) => {
    onPress(prop);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(plan)}
    >
      <Image source={{ uri: plan?.img }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{plan?.title}</Text>
        <Text style={styles.textFecha}>
          {plan?.event_date && formatDate(plan?.event_date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
