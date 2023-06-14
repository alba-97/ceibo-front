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
import { GenericButton } from "./GenericButton";

export const PlanDetailCard = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.selectedPlan);
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const screenHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const formattingDate = plan.event_date.split("T")[0].replaceAll("-", " / ");
  console.log("date", formattingDate);

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
    <ScrollView contentContainerStyle={{ minHeight: screenHeight }}>
      <Navbar />
      <View style={styles.card}>
        <Text style={styles.title}>{plan?.title}</Text>
        <Image
          source={{ uri: plan?.img }}
          style={{
            marginTop: "5%",
            width: "100%",
            height: "20%",
          }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Fecha</Text>
          <Text style={styles.text}>{formattingDate}</Text>
          <Text style={styles.subtitle}>Descripcion</Text>
          <Text style={styles.text}>{plan.description}</Text>
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
        <Text style={styles.subtitle}>Agrega un comentario del evento!</Text>
        <View style={{ marginTop: "5%" }}>{user._id && <Comments />}</View>
      </View>
    </ScrollView>
  );
};
