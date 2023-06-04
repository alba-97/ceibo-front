import React from "react";
import { View, Image, Text } from "react-native";
import styles from "../styles/ImageContainerStyles";
import { formatDate } from "../services/formatDate";

export const ImageContainer = ({ imageSource, date, event }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{event}</Text>
        <Text style={styles.textFecha}>{date && formatDate(date)}</Text>
      </View>
    </View>
  );
};
