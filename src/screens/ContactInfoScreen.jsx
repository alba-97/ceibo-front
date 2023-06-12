// Native
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { Linking } from 'react-native';
// import Mailer from 'react-native-mail';
// Components
import { GenericButton } from "../components/GenericButton";
import { ContactSwiper } from "../components/ContactSwiper";
import { getUserPlans } from "../services/getUserPlans";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import { ProfilePicture } from "../components/ProfilePicture";
import { ProfileText } from "../components/ProfileText";
import { styles } from "../styles/ProfileTextStyles";

export default function ContactInfoScreen() {
  const contact = useSelector((state) => state.selectedContact);
  const { first_name, last_name, address, phone, username, email } = contact;
  // const [userData, setUserData] = useState([]);
  // const [selectedPlan, setSelectedPlan] = useState(null);
  // const [isEventShared, setIsEventShared] = useState(false);

  const fullName = `${first_name}  ${last_name}`;
  const birthdate = contact.birthdate.split("-");
  const formattedBirthdate = `${birthdate[2].split("T")[0]} / ${
    birthdate[1]
  } / ${birthdate[0]}`;

  // useEffect(() => {
  //   getUserPlans().then((res) => setUserData(res));
  // }, []);

  // const handlePress = (plan) => {
  //   setSelectedPlan(plan);
  //   setIsEventShared(false);
  // };

  // const handleShareEvent = () => {
  //   if (selectedPlan) {
  //     setIsEventShared(true);
  //     setSelectedPlan(null);
  //   }
  // };

  const handlePress = (plan) => {
    setSelectedPlan(plan);
    setIsEventShared(false);
  };
  const handleShareEvent = () => {
    if (selectedPlan) {
      setIsEventShared(true);
      setSelectedPlan(null);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        flex: 1,
      }}
    >
      <Navbar />
      <View style={{ marginTop: "15%" }}>
        <View style={styles.container}>
          <ProfilePicture imageSource={contact.profile_img} />
          <View style={{ marginTop: "5%" }}></View>
          <ProfileText style={styles.text} text={username} />
          <ProfileText style={styles.text} text={`Nombre: ${fullName}`} />
          <ProfileText
            style={styles.text}
            text={`Cumpleaños: ${formattedBirthdate}`}
          />
          <ProfileText style={styles.text} text={`Teléfono: ${phone}`} />
          <ProfileText style={styles.text} text={`Email: ${email}`} />
          <ProfileText style={styles.text} text={`Dirección: ${address}`} />
        </View>
      </View>
    </LinearGradient>
  );
}

{
  /* <View style={styles.container}>
  <Navbar />
  <View style={styles.container2}>
    <Text style={styles.text1}>{contact.first_name}</Text>
  </View>
  <Text style={styles.text2}>Telefono:</Text>
  <Text style={styles.text3}>{contact.phoneNumbers[0]?.number}</Text>
  <ScrollView>
    <ContactSwiper
      plans={userData}
      title="Mis Planes"
      onPress={handlePress}
    />
    {selectedPlan && (
      <View style={styles.inputContainer}>
        <GenericButton
          text={"Compartir Plan"}
          onPress={handleShareEvent}
        />
      </View>
    )}
    <View style={styles.container2}>
      {isEventShared && (
        <View style={styles.container2}>
          <Text style={styles.shareMessage}>¡Plan compartido!</Text>
          <GenericButton
            text={"Aceptar"}
            onPress={() => setIsEventShared(false)}
          />
        </View>
      )}
    </View>
  </ScrollView>
</View> */
}
