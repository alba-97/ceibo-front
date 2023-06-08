// Native
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, Image, ScrollView } from "react-native";
import React from "react";
// Components
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import { ImageContainer } from "../components/ImageContainer";
// import noPlan from "../assets/noPlan.png";

export default function AddPlanScreen({ imageSource }) {
  const imgSrc = imageSource;
  //  || noPlan;
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
        <GenericInput />
        <Text style={styles.text}>Descripcion</Text>
        <GenericInput />
        <Text style={styles.text}>Lugar</Text>
        <GenericInput />
        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput style={styles.input2} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora</Text>
            <TextInput style={styles.input2} />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Minima Edad</Text>
            <TextInput style={styles.input2} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Maxima Edad</Text>
            <TextInput style={styles.input2} />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pago Minimo</Text>
            <TextInput style={styles.input2} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pago Total</Text>
            <TextInput style={styles.input2} />
          </View>
        </View>
    
        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora de Inicio</Text>
            <TextInput style={styles.input2} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora de Cierre</Text>
            <TextInput style={styles.input2} />
          </View>
        </View> 
           <Text style={styles.text}>Categoria</Text>
        <GenericInput />
        <Text style={styles.text}>Link para pagar</Text>
        <GenericInput />
        <Text style={styles.text}>Imagen</Text>
        <ImageContainer
          style={styles.foto}
          imageSource={
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fotos-editar-tiktok-1620329179.jpg?crop=1xw:0.6004447739065975xh;center,top&resize=1200:*"
          }
        />
         <View style={styles.crearPlan}>
        <GenericButton text={"Crear Plan"} />
        </View> 
    </View> 
    </ScrollView>
    </LinearGradient>
    </View>
  );
}
