// React Components
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Components
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
import { SwiperComponent } from "../components/Swiper";
// Other Imports
import { getAllPlans } from "../services/getAllPlans";
import { getUserPlans } from "../services/getUserPlans";
import { getUser } from "../services/getUser";

import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const user = await getUser();
        if (user) {
          dispatch(setUser(user));
          const userPlans = await getUserPlans();
          setUserData(userPlans);
        }
        const plans = await getAllPlans();
        setData(plans);
      } catch (error) {
        console.log(123, error);
      }
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
        <SwiperComponent plans={data} title="Patrocinado" />
        {userData[0] && (
          <>
            <SwiperComponent plans={userData} title="Mis Planes" />
            <SwiperComponent plans={data} title="Planes de Amigos" />
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
