
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Navbar } from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { GenericButton } from "../components/GenericButton";
import { SwiperComponent } from "../components/Swiper";
import { getAllPlans } from "../services/getAllPlans";
import { getUserPlans } from "../services/getUserPlans";

export const ContactInfoScreen = ({ route }) => {
    const { contact } = route.params;
    //const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
        //getAllPlans().then((res) => setData(res));
        getUserPlans().then((res) => setUserData(res));
      }, []);
    return (      
        <LinearGradient
            colors={["#000", "#7D0166"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              flex: 1,
              
            }}
          >
      <View style={styles.container}>
        <Navbar/> 
        <View style={styles.container2}>
        <Text style={styles.text1}>{contact.name}</Text>
        </View>
        <Text style={styles.text2}>Telefono:</Text>
        <Text style={styles.text3}>{contact.phoneNumbers[0]?.number}</Text>
        <ScrollView>
        <SwiperComponent plans={userData} title="Mis Planes" />
        {/* <SwiperComponent plans={data} title="Planes de Amigos" /> */}
        <View style={styles.inputContainer}>
          <GenericButton text={"Compartir Evento"} />
        </View>
      </ScrollView>
      </View>
      </LinearGradient> 
    );
  };
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
     // alignItems: "center",
    },  
    container2: {
        alignItems: "center",
      },  
    inputContainer: {
       paddingBottom: "10%",
        alignItems: "center",
        flex: 1,
      },
   
    text1: {
      justifyContent:"center",
   //   alignItems: "center",
      paddingBottom: "1%",
      paddingLeft:"5%",
      color: "#FFF",
      fontSize: 30,
      fontWeight: "bold",
    
    },

    text2: {
        
        paddingLeft:"5%",
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
        
      },

    text3: {
        paddingBottom: "1%",
        paddingLeft:"5%",
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderColor: "white",
      },
  });
  