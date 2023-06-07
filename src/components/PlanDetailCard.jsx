import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { formatDate } from "../services/formatDate";
import { styles } from "../styles/PlanDetails";

export const PlanDetailCard = ({ plan }) => {
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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Invitar Personas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
