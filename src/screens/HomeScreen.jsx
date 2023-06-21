import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useContext } from "react";
import { ScrollView, Text } from "react-native";

// Components
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
import { SwiperComponent } from "../components/Swiper";
import { MainEvent } from "../components/MainEvent";

// Other Imports
import { getAllPlans } from "../services/getAllPlans";
import { getUserPlans } from "../services/getUserPlans";
import { getFilteredPlans } from "../services/getFilteredPlans";
import { getUser } from "../services/getUser";
import { getPlan } from "../services/getPlan";

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { setSelectedPlan, setOrganizer } from "../state/selectedPlan";
import { setUser, setUserPlans } from "../state/user";
import { setPlans } from "../state/plans";

import { SharedRefetchContext } from "../sharedRefetchContext";
import { getOrganizer } from "../services/getOrganizer";
import { ProfileText } from "../components/ProfileText";

export default function HomeScreen() {
  const user = useSelector((state) => state.user);
  const plans = useSelector((state) => state.plans);

  const { refetch, triggerRefetch } = useContext(SharedRefetchContext);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = async (plan) => {
    const updatedPlan = await getPlan(plan._id);
    dispatch(setSelectedPlan(updatedPlan));
    const organizer = await getOrganizer(plan._id);
    dispatch(setOrganizer(organizer));
    navigation.navigate("PlanDetail");
  };

  useEffect(() => {
    getUser().then((userData) => {
      if (userData._id) {
        dispatch(setUser(userData));
        getUserPlans().then((userPlans) => dispatch(setUserPlans(userPlans)));
        if (userData.preferences && userData.preferences[0]) {
          getFilteredPlans().then((plans) => dispatch(setPlans(plans)));
        } else {
          getAllPlans().then((plans) => dispatch(setPlans(plans)));
        }
      } else {
        getAllPlans().then((plans) => dispatch(setPlans(plans)));
      }
    });
  }, [refetch]);

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <ScrollView>
        {plans[0] && (
          <MainEvent
            plan={plans[0]}
            title="Patrocinado"
            onPress={handlePress}
          />
        )}
        <SwiperComponent
          plans={plans}
          text="Nuestras recomendaciones"
          onPress={handlePress}
        />
        {user && user.plans && user.plans[0] ? (
          <SwiperComponent
            plans={user.plans}
            text="Tus Planes"
            onPress={handlePress}
          />
        ) : (
          <>
            <Text style={styles.text}>Tus planes</Text>
            <Text style={[styles.text, { textAlign: "center" }]}>
              Aún no tienes planes
            </Text>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
