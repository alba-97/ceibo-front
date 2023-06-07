// Native
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
// Components
import { formatDate } from "../services/formatDate";
import { setSelectedPlan } from "../state/selectedPlan";
// Styles
import styles from "../styles/ImageContainerStyles";

export const ImageContainer = ({ plan }) => {
  const navigation = useNavigation();
  console.log("plan", plan);
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setSelectedPlan(plan));
    navigation.navigate("PlanDetail");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
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
