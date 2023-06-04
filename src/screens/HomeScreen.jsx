// React Components
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Components
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
// Other Imports
import { SwiperComponent } from "../components/Swiper";
import { getAllPlans } from "../services/getAllPlans";
import { getUserPlans } from "../services/getUserPlans";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllPlans().then((res) => setData(res));
    getUserPlans().then((res) => setUserData(res));
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
        <SwiperComponent plans={data} title="Patrocinado" />
        <SwiperComponent plans={userData} title="Mis Planes" />
        <SwiperComponent plans={data} title="Planes de Amigos" />
      </ScrollView>
    </LinearGradient>
  );
}
