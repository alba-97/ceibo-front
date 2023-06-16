import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GenericInput } from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { API_URL, PORT } from "@env";
import axios from "axios";
import { SingleContact } from "../components/SingleContact";
import { styles } from "../styles/stylesContact";

export default function SearchScreen() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleQueryChange = (text) => {
    setQuery(text);
    setResults(
      data.filter((item) =>
        item.username.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (API_URL && PORT) {
      axios
        .get(`${API_URL}:${PORT}/api/users`)
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
        <View
          style={[
            styles.container3,
            { flexDirection: "row", justifyContent: "center" },
          ]}
        >
          <GenericInput
            value={query}
            onChangeText={handleQueryChange}
            placeholder="Buscar usuario"
          />
        </View>
        <ScrollView style={{ width: "100%" }}>
          {results ? (
            results.map((item) => (
              <View style={styles.text1} key={item.username}>
                <SingleContact username={item.username} phone={item.phone} />
              </View>
            ))
          ) : (
            <Text>Cargando datos...</Text>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
