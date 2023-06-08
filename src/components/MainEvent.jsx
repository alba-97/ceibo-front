import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles/mainEvent";
import { formatDate } from "../services/formatDate";
import { useNavigation } from "@react-navigation/core";

export const MainEvent = ({ plan, onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("PlanDetail", { plan });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <View>
        <Image source={{ uri: plan?.img }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text}>{plan?.title}</Text>
          <Text style={styles.textFecha}>
            {plan?.event_date && formatDate(plan?.event_date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
