// React Components
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
// Components
import { getUserPlans } from "../services/getUserPlans";
import { SwiperComponent } from "../components/Swiper";
import { getAllPlans } from "../services/getAllPlans";
import { Navbar } from "../components/Navbar";
import { styles } from "../appCss";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllPlans()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
    getUserPlans()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, []);
  console.log("data plans", data);
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
