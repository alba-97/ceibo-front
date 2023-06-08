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
import { useDispatch } from "react-redux";
import { setSelectedPlan } from "../state/selectedPlan";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen() {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
        <MainEvent plan={data[0]} title="Patrocinado" onPress={handlePress} />
        <SwiperComponent
          plans={data}
          text="Nuestras recomendaciones"
          onPress={handlePress}
        />

        <SwiperComponent
          plans={userData}
          text="Tus Planes"
          onPress={handlePress}
        />
      </ScrollView>
    </LinearGradient>
  );
}
