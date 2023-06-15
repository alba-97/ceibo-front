// Native
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
// Components
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { API_URL, PORT } from "@env";
import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DatePicker } from "../components/DatePicker";

export default function AddPlanScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [event_date, setEvent_date] = useState(null);
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [min_age, setMin_age] = useState("");
  const [max_age, setMax_age] = useState("");
  const [min_to_pay, setMin_to_pay] = useState("");
  const [total_to_pay, setTotal_to_pay] = useState("");
  const [category, setCategory] = useState("");
  const [link_to_pay, setLink_to_pay] = useState("");
  const [path, setPath] = useState("");

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setPath(result.assets[0].uri);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setEvent_date(event_date);
  }, [event_date]);

  const handleSubmit = async () => {
    try {
      let formattedDate = event_date;
      if (formattedDate instanceof Date) {
        formattedDate = formattedDate.toISOString().split("T")[0];
      }
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const formData = new FormData();

        formData.append("image", {
          uri: path, // La URI del archivo en el dispositivo
          type: "image/jpeg", // El tipo de archivo (puede variar según el formato)
          name: "image.jpg", // El nombre del archivo
        });

        const res = await axios.post(`${API_URL}:${PORT}/api/upload`, formData);
        const result = res.data;

        const { imageUrl } = result;

        await axios.post(
          `${API_URL}:${PORT}/api/events/`,
          {
            title,
            description,
            location,
            img: imageUrl,
            event_date: formattedDate,
            start_time,
            end_time,
            min_age,
            max_age,
            min_to_pay,
            total_to_pay,
            category,
            link_to_pay,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Exito", "Evento agregado");
      }
    } catch (error) {
      console.log(error.response.data);
      Alert.alert("Error", error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.text}>Titulo</Text>
            <GenericInput value={title} onChangeText={setTitle} />
            <Text style={styles.text}>Descripcion</Text>
            <GenericInput value={description} onChangeText={setDescription} />
            <Text style={styles.text}>Lugar</Text>
            <GenericInput value={location} onChangeText={setLocation} />
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha</Text>
                <DatePicker
                  type="date"
                  value={event_date}
                  onChange={(date) => setEvent_date(new Date(date))}
                  placeholder="DD/MM/YYYY"
                  customStyle={styles.birthdate}
                />
              </View>
            </View>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Minima Edad</Text>
                <GenericInput
                  value={min_age}
                  onChangeText={setMin_age}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Maxima Edad</Text>
                <GenericInput
                  value={max_age}
                  onChangeText={setMax_age}
                  style={styles.input2}
                />
              </View>
            </View>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pago Minimo</Text>
                <GenericInput
                  value={min_to_pay}
                  onChangeText={setMin_to_pay}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pago Total</Text>
                <GenericInput
                  value={total_to_pay}
                  onChangeText={setTotal_to_pay}
                  style={styles.input2}
                />
              </View>
            </View>

            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de Inicio</Text>
                <GenericInput
                  value={start_time}
                  onChangeText={setStart_time}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de Cierre</Text>
                <GenericInput
                  value={end_time}
                  onChangeText={setEnd_time}
                  style={styles.input2}
                />
              </View>
            </View>
            <Text style={styles.text}>Categoria</Text>
            <GenericInput value={category} onChangeText={setCategory} />
            <Text style={styles.text}>Link para pagar</Text>
            <GenericInput value={link_to_pay} onChangeText={setLink_to_pay} />
            <Text style={styles.text}>Imagen</Text>
            <TouchableOpacity style={styles.container} onPress={selectImage}>
              <Image
                source={{
                  uri: "https://cdn.discordapp.com/attachments/1105565124825186415/1113122954897801406/El_club_del_plan.png",
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.crearPlan}>
              <GenericButton onPress={handleSubmit} text={"Crear Plan"} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
