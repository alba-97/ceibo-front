import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/preferencesStyles";
import axios from "axios";
import { API_URL, PORT } from "@env";
import { Navbar } from "../components/Navbar";
import MultipleDropdown from "../components/MultipleDropdown";
import { GenericButton } from "../components/GenericButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PreferencesScreen() {
  const [selected, setSelected] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`${API_URL}:${PORT}/api/categories/`);
        setCategories(
          res.data.map((item, index) => ({ key: index, value: item.name }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = AsyncStorage.getItem("token");
      if (token) {
        await axios.post(`${API_URL}:${PORT}/api/users/preferences/`);
      }
    } catch (error) {
      console.log(111, error);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>
          Mostraremos eventos que sean acordes a tus preferencias
        </Text>
        <View style={styles.container}>
          <MultipleDropdown
            setSelected={(val) => setSelected(val)}
            data={categories}
            save="value"
            onSelect={() => {
              console.log(selected);
            }}
            label="Preferencias"
            placeholder="Preferencias"
            search={false}
            boxStyles={{ backgroundColor: "white", maxWidth: "70%" }}
            dropdownStyles={{ backgroundColor: "white", maxWidth: "70%" }}
          />
          <GenericButton onPress={handleSubmit} text={"Actualizar"} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
