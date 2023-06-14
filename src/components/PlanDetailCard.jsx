import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { formatDate } from "../services/formatDate";
import { getUserPlans } from "../services/getUserPlans";
import { styles } from "../styles/PlanDetails";
import { useSelector, useDispatch } from "react-redux";

import { setUserPlans } from "../state/user";

import axios from "axios";
import { API_URL, PORT } from "@env";
import { GenericButton } from "./GenericButton";

export const PlanDetailCard = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.selectedPlan);
  const date = plan?.event_date;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
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
      const newPlans = await getUserPlans();
      dispatch(setUserPlans(newPlans));
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log("handle roll error", error);
    }
  };

  const handleStopParticipating = async (id) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.delete(
        `${API_URL}:${PORT}/api/events/stop-participating/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newPlans = await getUserPlans();
      dispatch(setUserPlans(newPlans));
      setLoading(false);
    } catch (error) {
      console.log("stop participating handler error", error);
      setLoading(false);
    }
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
          <Text style={styles.subTitle}>Fecha</Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
          {user._id && (
            <View style={styles.buttonContainer}>
              {!user.plans?.some((userPlan) => userPlan._id === plan._id) ? (
                <>
                  {!loading ? (
                    <GenericButton text={"Participar"} onPress={handleEnroll} />
                  ) : (
                    <GenericButton
                      text={"Cargando..."}
                      customStyle={{ backgroundColor: "#7D0166" }}
                    />
                  )}
                </>
              ) : (
                <>
                  {!loading ? (
                    <GenericButton
                      text={"Dejar de participar"}
                      onPress={() => handleStopParticipating(plan._id)}
                    />
                  ) : (
                    <GenericButton
                      text={"Cargando..."}
                      customStyle={{ backgroundColor: "#7D0166" }}
                    />
                  )}
                </>
              )}
              <GenericButton text={"Invitar Personas"} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
