import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, Image, ScrollView, Alert } from "react-native";
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
import MultipleDropdown from "./MultipleDropdown";
import { useNavigation } from "@react-navigation/core";

export const PlanDetailCard = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.selectedPlan);
  const user = useSelector((state) => state.user);
  const screenHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [invited, setInvited] = useState("");
  const navigation = useNavigation();
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        let res = await axios.get(`${API_URL}:${PORT}/api/users`);
        setUsers(
          res.data.map((item) => ({ label: item.email, value: item.email }))
        );
        const token = await AsyncStorage.getItem("token");
        res = await axios.get(
          `${API_URL}:${PORT}/api/events/${plan._id}/can-update`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCanEdit(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchInfo();
  }, []);

  const formattingDate = plan.event_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const handleInvite = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_URL}:${PORT}/api/users/invite`,
      {
        users: invited,
        plan,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Alert.alert("OK", "Invitaciones enviadas");
  };

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
      console.log(error);
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
      console.log(error);
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
                    <View>
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
                    </View>
                  )}
                  <View style={styles.input}>
                    <MultipleDropdown
                      setSelected={(val) => setInvited(val)}
                      data={users}
                      save="value"
                      onSelect={() => {}}
                      label="Invitar personas"
                      placeholder="Invitar personas"
                      search={false}
                      textStyles={styles.item}
                      boxStyles={styles.dropdown}
                      dropdownStyles={styles.dropdown}
                      badgeStyles={styles.item}
                    />
                    {invited.length > 0 && (
                      <GenericButton text={"Invitar"} onPress={handleInvite} />
                    )}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        {canEdit && (
          <GenericButton
            text={"Editar evento"}
            onPress={() => {
              navigation.navigate("EditPlan");
            }}
          />
        )}
        {user._id && <Comments />}
      </View>
    </ScrollView>
  );
};
