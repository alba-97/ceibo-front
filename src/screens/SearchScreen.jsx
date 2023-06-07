// React Components
import { Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
// Components
import { ImageContainer } from "../components/ImageContainer";
import { GenericInput } from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { API_URL, PORT } from "@env";
import { styles } from "../appCss";
import axios from "axios";

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
                <ImageContainer key={index} plan={item} />
              ))
            ) : (
              <Text>Cargando datoss...</Text>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}
