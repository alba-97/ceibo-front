// React Components
import { Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState, useContext } from "react";
// Components
import { GenericInput } from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { API_URL, PORT } from "@env";
import { styles } from "../appCss";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { setSelectedPlan, setOrganizer } from "../state/selectedPlan";
import { getPlan } from "../services/getPlan";
import { SearchImg } from "../components/searchImage";
import { getOrganizer } from "../services/getOrganizer";
import refetchData from "../services/refetchData";

export default function SearchScreen() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { refetch } = refetchData();

  const handlePress = async (plan) => {
    const updatedPlan = await getPlan(plan._id);
    dispatch(setSelectedPlan(updatedPlan));
    const organizer = await getOrganizer(plan._id);
    dispatch(setOrganizer(organizer));
    navigation.navigate("PlanDetail");
  };

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
  }, [refetch]);

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
          <ScrollView style={{ width: "100%" }}>
            {results ? (
              results.map((item, index) => (
                <SearchImg key={index} plan={item} onPress={handlePress} />
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
