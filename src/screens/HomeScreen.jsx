import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

// Components
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
import { SwiperComponent } from "../components/Swiper";

// Other Imports
import { getAllPlans } from "../services/getAllPlans";
import { getUserPlans } from "../services/getUserPlans";
import { MainEvent } from "../components/MainEvent";

import { getUser } from "../services/getUser";

import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserPlans } from "../state/user";
import { setPlans } from "../state/plans";
import { setSelectedPlan } from "../state/selectedPlan";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen() {
  const user = useSelector((state) => state.user);
  const plans = useSelector((state) => state.plans);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = (plan) => {
    dispatch(setSelectedPlan(plan));
    navigation.navigate("PlanDetail");
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          dispatch(setUser(userData));
          const userPlans = await getUserPlans();
          dispatch(setUserPlans(userPlans));
        }
        const plans = await getAllPlans();
        dispatch(setPlans(plans));
      } catch (error) {}
    };
    fetchInfo();

  }, []);
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <ScrollView>
        <MainEvent plan={plans[0]} />
        <SwiperComponent
          plans={plans}
          text="Planes Sugeridos"
          direction={false}
          onPress={handlePress}
        /> {user.plans && user.plans[0]  (
          <>
            <SwiperComponent plans={user.plans} text="Tus Planes" direction={true} onPress={handlePress} />
            />
          </>: ""
        )}
      </ScrollView>
    </LinearGradient>
  );
}
