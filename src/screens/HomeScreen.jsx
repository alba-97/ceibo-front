import { StatusBar } from "expo-status-bar";
// React Components
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../appCss";
// Components
import Navbar from "../components/Navbar";
import { GenericInput } from "../components/GenericInput";
import ProfilePicture from "../components/ProfilePicture";
import ProfileText from "../components/ProfileText";
import { ImageContainer } from "../components/ImageContainer";
import axios from "axios";
import { API_URL, PORT } from "@env";

export default function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (API_URL && PORT) {
      axios
        .get(`${API_URL}:${PORT}/api/events`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const formatDate = (date) => {
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "septiembre",
      "octubre",
      "diciembre",
    ];
    date = date.split("-");
    const day = parseInt(date[2], 10);
    const month = months[parseInt(date[1], 10) - 1];
    const year = date[0];
    return `${day} de ${month} de ${year}`;
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <ScrollView>
        <Navbar />

        <ImageContainer
          imageSource="https://www.billboard.com/wp-content/uploads/2022/09/bad-bunny-press-credit-eric-rojas-2022-billboard-2-1548.jpg?w=942&h=623&crop=1"
          date="28 de mayo de 2023"
          event="Conejo malo"
        />
        <GenericInput />

        <ProfileText text="Leon Stefano" />

        <ProfilePicture imageSource="https://st2.depositphotos.com/1017732/9796/i/450/depositphotos_97968600-stock-photo-pensive-man-looking-at-the.jpg" />

        {data ? (
          <>
            {data.map((item) => {
              return (
                <ImageContainer
                  key={item.id}
                  imageSource={
                    item.img
                      ? item.img
                      : "https://www.billboard.com/wp-content/uploads/2022/09/bad-bunny-press-credit-eric-rojas-2022-billboard-2-1548.jpg?w=942&h=623&crop=1"
                  }
                  date={item.event_date && formatDate(item.event_date)}
                  event={item.title}
                />
              );
            })}
          </>
        ) : (
          <Text>Cargando datos...</Text>
        )}

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
