import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { formatDate } from "../services/formatDate";
import { GenericButton } from "./GenericButton";
import { styles } from "../styles/PlanDetails";
import { useSelector } from "react-redux";

export const PlanDetailCard = () => {
  const plan = useSelector((state) => state.selectedPlan);
  const date = plan?.event_date;
  return (
    <View style={styles.card}>
      <ScrollView>
        <Text style={styles.title}>{plan?.title}</Text>
        <Image source={{ uri: plan?.img }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle}>Fecha</Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
          <Text style={styles.subTitle}>Descripcion</Text>
          <Text style={styles.text}>{plan.description}</Text>
          <Text style={styles.subTitle}>Fecha</Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
          <View style={styles.addButton}>
            <GenericButton text="Invitar Personas" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
