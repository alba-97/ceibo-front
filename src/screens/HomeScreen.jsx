import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../appCss";
import { GenericInput } from "../components/GenericInput";
import { ImageContainer } from "../components/ImageContainer";
import { Navbar } from "../components/Navbar";
import { TextDeUsuario } from "../components/TextDeUsuario";
import { FotoDeUsuario } from "../components/FotoDeUsuario";
// import axios from "axios";
// import { API_URL, PORT } from "@env";

export default function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (API_URL && PORT) {
  //     axios
  //       .get(`${API_URL}:${PORT}/api/events`)
  //       .then((response) => {
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

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
      <Navbar />
      <ScrollView>
        {data ? (
          <Text>
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
          </Text>
        ) : (
          <Text>Cargando datos...</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
