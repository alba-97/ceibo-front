import React, { useState } from "react";
import { Dimensions, View, Text, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navbar } from "../components/Navbar";
import { getUserPlans } from "../services/getUserPlans";
import { styles } from "../styles/PlanDetails";
import { useSelector, useDispatch } from "react-redux";
import { setUserPlans } from "../state/user";
import axios from "axios";
import { API_URL, PORT } from "@env";
import Comments from "./Comments";
import Rating from "./Rating";
import { GenericButton } from "./GenericButton";

export const PlanDetailCard = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.selectedPlan);
  const user = useSelector((state) => state.user);
  const screenHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const formattingDate = plan.event_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const handleEnroll = async () => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleStopParticipating = async (id) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ minHeight: screenHeight * 2 }}>
      <View style={styles.card}>
        <Image
          source={{ uri: plan?.img }}
          style={{
            width: "100%",
            height: "15%",
          }}
        />
        <Text style={styles.title}>{plan?.title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Fecha</Text>
          <Text style={styles.text}>{formattingDate}</Text>
          <Text style={styles.subtitle}>Descripcion</Text>
          <Text style={styles.text}>{plan.description}</Text>

          {plan.ended ? (
            <View>
              <Text style={styles.subtitle}>
                El evento finalizó el {formattingDate}
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
                <View style={styles.buttonContainer}>
                  {!user.plans?.some(
                    (userPlan) => userPlan._id === plan._id
                  ) ? (
                    <View>
                      {!loading ? (
                        <GenericButton
                          text={"Participar"}
                          onPress={handleEnroll}
                        />
                      ) : (
                        <GenericButton
                          text={"Cargando..."}
                          customStyle={{ backgroundColor: "#7D0166" }}
                        />
                      )}
                    </View>
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
          )}
        </View>
        {user._id && <Comments />}
      </View>
    </ScrollView>
  );
};
