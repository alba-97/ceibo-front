// Native
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
// Components
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { API_URL, PORT } from "@env";

import { ImageContainer } from "../components/ImageContainer";
// import noPlan from "../assets/noPlan.png";

export default function AddPlanScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [minToPay, setMinToPay] = useState("");
  const [totalToPay, setTotalToPay] = useState("");
  const [category, setCategory] = useState("");
  const [linkToPay, setLinkToPay] = useState("");

  const handleSubmit = async () => {};

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
                <TextInput
                  value={date}
                  onChangeText={setDate}
                  style={styles.input2}
                />
              </View>
            </View>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Minima Edad</Text>
                <TextInput
                  value={minAge}
                  onChangeText={setMinAge}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Maxima Edad</Text>
                <TextInput
                  value={maxAge}
                  onChangeText={setMaxAge}
                  style={styles.input2}
                />
              </View>
            </View>
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pago Minimo</Text>
                <TextInput
                  value={minToPay}
                  onChangeText={setMinToPay}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pago Total</Text>
                <TextInput
                  value={totalToPay}
                  onChangeText={setTotalToPay}
                  style={styles.input2}
                />
              </View>
            </View>

            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de Inicio</Text>
                <TextInput
                  value={startTime}
                  onChangeText={setStartTime}
                  style={styles.input2}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Hora de Cierre</Text>
                <TextInput
                  value={endTime}
                  onChangeText={setEndTime}
                  style={styles.input2}
                />
              </View>
            </View>
            <Text style={styles.text}>Categoria</Text>
            <GenericInput value={category} onChangeText={setCategory} />
            <Text style={styles.text}>Link para pagar</Text>
            <GenericInput value={linkToPay} onChangeText={setLinkToPay} />
            <Text style={styles.text}>Imagen</Text>
            <ImageContainer
              style={styles.foto}
              imageSource={
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fotos-editar-tiktok-1620329179.jpg?crop=1xw:0.6004447739065975xh;center,top&resize=1200:*"
              }
            />
            <View style={styles.crearPlan}>
              <GenericButton onPress={handleSubmit} text={"Crear Plan"} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
