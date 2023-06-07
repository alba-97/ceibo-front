// React Components
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
// Components
import { getUserPlans } from "../services/getUserPlans";
import { setSelectedPlan } from "../state/selectedPlan";
import { SwiperComponent } from "../components/Swiper";
import { useNavigation } from "@react-navigation/core";
import { getAllPlans } from "../services/getAllPlans";
import { Navbar } from "../components/Navbar";
import { styles } from "../appCss";
import { useDispatch } from "react-redux";

export default function HomeScreen() {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = (plan) => {
    dispatch(setSelectedPlan(plan));
    navigation.navigate("PlanDetail");
  };

  useEffect(() => {
    getAllPlans()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
    getUserPlans()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
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
        <SwiperComponent
          plans={data}
          title="Patrocinado"
          onPress={handlePress}
        />
        <SwiperComponent
          plans={userData}
          title="Mis Planes"
          onPress={handlePress}
        />
        <SwiperComponent
          plans={data}
          title="Planes de Amigos"
          onPress={handlePress}
        />
      </ScrollView>
    </LinearGradient>
  );
}
