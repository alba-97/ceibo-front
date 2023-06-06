// React Components
import React, { useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Components
import { styles } from "../appCss";
import { ImageContainer } from "../components/ImageContainer";
import { Navbar } from "../components/Navbar";
import { GenericInput } from "../components/GenericInput";
// Other Imports
import axios from "axios";
import { API_URL, PORT } from "@env";

export default function SearchScreen() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleQueryChange = (text) => {
    setQuery(text);
    setResults(
      data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (API_URL && PORT) {
      axios
        .get(`${API_URL}:${PORT}/api/events`)
        .then((response) => {
          setData(response.data);
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <View style={styles.searchContainer}>
          <GenericInput value={query} onChangeText={handleQueryChange} />
        </View>
        <View style={styles.content}>
          <ScrollView>
            {results ? (
              results.map((item, index) => (
                <ImageContainer
                  key={index}
                  imageSource={
                    item.img ||
                    "https://www.billboard.com/wp-content/uploads/2022/09/bad-bunny-press-credit-eric-rojas-2022-billboard-2-1548.jpg?w=942&h=623&crop=1"
                  }
                  date={item.event_date}
                  event={item.title}
                />
              ))
            ) : (
              <Text>Cargando datos...</Text>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}
