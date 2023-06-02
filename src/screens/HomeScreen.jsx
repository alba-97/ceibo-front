// React Components
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Components
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
// Other Imports
import { SwiperComponent } from "../components/Swiper";
import { getAllPlans } from "../services/getAllPlans";

export default function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPlans().then((res) => setData(res));
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
        <SwiperComponent plans={data} title="Mis Planes" />
        <SwiperComponent plans={data} title="Planes de Amigos" />
      </ScrollView>
    </LinearGradient>
  );
}
