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
import { MainEvent } from "../components/MainEvent";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [main, setMain] = useState({});
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllPlans()
      .then((res) => {
        setMain(res.shift());
        setData(res);
      })
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
        <MainEvent plan={main} />

        <SwiperComponent
          plans={data}
          text="Planes Sugeridos"
          direction={false}
        />
        <SwiperComponent plans={userData} text="Tus Planes" direction={true} />
      </ScrollView>
    </LinearGradient>
  );
}
