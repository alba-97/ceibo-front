import React, { useState } from "react";
import { Dimensions, View, Text, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    <ScrollView style={{ minHeight: screenHeight }}>
      <View style={styles.card}>
        <Text style={styles.title}>{plan?.title}</Text>
        <Image
          source={{ uri: plan?.img }}
          style={{
            width: "100%",
            height: 200,
          }}
        />
        <View style={{ justifyContent: "center", marginTop: 5 }}>
          <View style={styles.date}>
            <Text style={styles.subtitle}>Fecha:</Text>
            <Text style={styles.text}>{formattingDate}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {!plan.ended ? (
              !user.plans?.some((userPlan) => userPlan._id === plan._id) ? (
                <>
                  {!loading ? (
                    <GenericButton
                      customStyle={styles.button}
                      textStyle={{ fontSize: 12 }}
                      text={"+"}
                      onPress={handleEnroll}
                    />
                  ) : (
                    <GenericButton
                      textStyle={{ fontSize: 12 }}
                      text={"Cargando..."}
                      customStyle={styles.button}
                    />
                  )}
                </>
              ) : (
                <>
                  {!loading ? (
                    <GenericButton
                      text={"x"}
                      textStyle={{ fontSize: 12 }}
                      customStyle={styles.button}
                      onPress={() => handleStopParticipating(plan._id)}
                    />
                  ) : (
                    <GenericButton
                      text={"Cargando..."}
                      textStyle={{ fontSize: 12 }}
                      customStyle={styles.button}
                    />
                  )}
                </>
              )
            ) : (
              ""
            )}

            <GenericButton
              text={"Compartir"}
              textStyle={{ fontSize: 12 }}
              customStyle={styles.button2}
            />
          </View>
        </View>

        <Text style={styles.subtitle}>Descripcion:</Text>
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
          ""
        )}
        {user._id && <Comments />}
      </View>
    </ScrollView>
  );
};
