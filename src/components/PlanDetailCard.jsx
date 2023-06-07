import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDate } from "../services/formatDate";
import { styles } from "../styles/PlanDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL, PORT } from "@env";

export const PlanDetailCard = ({ plan }) => {
  const date = plan?.event_date;
  const user = useSelector((state) => state.user);

  const handleEnroll = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_URL}:${PORT}/api/events/enroll`,
      { eventId: plan._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <View style={styles.card}>
      <ScrollView>
        <Text style={styles.title}>{plan?.title}</Text>
        {plan.img && <Image source={{ uri: plan.img }} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle}>Fecha</Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
          <Text style={styles.subTitle}>Descripcion</Text>
          <Text style={styles.text}>{plan.description}</Text>
          {user._id && (
            <View>
              <TouchableOpacity style={styles.addButton} onPress={handleEnroll}>
                <Text style={styles.addButtonText}>Participar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Invitar Personas</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
