import React from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navbar } from "../components/Navbar";
import { formatDate } from "../services/formatDate";
import { getUserPlans } from "../services/getUserPlans";
import { styles } from "../styles/PlanDetails";
import { useSelector, useDispatch } from "react-redux";
import { setUserPlans } from "../state/user";

import axios from "axios";
import { API_URL, PORT } from "@env";
import Comments from "./Comments";
import Rating from "./Rating";

export const PlanDetailCard = () => {
  const dispatch = useDispatch();

  const plan = useSelector((state) => state.selectedPlan);

  const user = useSelector((state) => state.user);
  const screenHeight = Dimensions.get("window").height;

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
    const newPlans = await getUserPlans();
    dispatch(setUserPlans(newPlans));
  };

  return (
    <ScrollView contentContainerStyle={{ minHeight: screenHeight }}>
      <Navbar />
      <View style={styles.card}>
        <Text style={styles.title}>{plan?.title}</Text>
        {plan.img && <Image source={{ uri: plan.img }} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Descripcion</Text>
          <Text style={styles.text}>{plan.description}</Text>
          {plan.ended ? (
            <View>
              <Text style={styles.subtitle}>
                El evento finalizó el{" "}
                {plan.event_date.split("T")[0].split("-").reverse().join("/")}
              </Text>

              {user._id &&
                user.plans &&
                user.plans.some((userPlan) => userPlan._id == plan._id) &&
                plan.organizer &&
                plan.ended && <Rating plan={plan} />}
            </View>
          ) : (
            <View>
              {user._id && (
                <View>
                  {user.plans &&
                    !user.plans.some(
                      (userPlan) => userPlan._id == plan._id
                    ) && (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleEnroll}
                      >
                        <Text style={styles.buttonText}>Participar</Text>
                      </TouchableOpacity>
                    )}

                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.buttonText}>Invitar Personas</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.subtitle}>Fecha</Text>
              <Text style={styles.text}>
                {plan.event_date && formatDate(plan.event_date)}
              </Text>
            </View>
          )}
        </View>
        {user._id && <Comments />}
      </View>
    </ScrollView>
  );
};
