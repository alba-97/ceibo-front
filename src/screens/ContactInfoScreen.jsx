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
import { styles } from "../styles/stylesContactInfo";
import { Navbar } from "../components/Navbar";

export default ContactInfoScreen = ({ route }) => {
  const { contact } = route.params;
  const [userData, setUserData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isEventShared, setIsEventShared] = useState(false);

  useEffect(() => {
    getUserPlans().then((res) => setUserData(res));
  }, []);

  const handlePress = (plan) => {
    setSelectedPlan(plan);
    setIsEventShared(false);
  };
  const handleShareEvent = () => {
    if (selectedPlan) {
      console.log("Evento compartido:", selectedPlan);
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
      <View style={styles.container}>
        <Navbar />
        <View style={styles.container2}>
          <Text style={styles.text1}>{contact.name}</Text>
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
      </View>
    </LinearGradient>
  );
};

//  const handleShareEvent = () => {
//     if (selectedPlan) {
//      // const { title, event_date } = selectedPlan;
//       const subject = '¡Te invito a un evento en nuestra app!';
//       const body = `Hola,\n\nTe invito a un evento llamado "remplazar por el titulo" que tendrá lugar el remplazar por la fecha. ¡No te lo pierdas!\n\nPuedes ver más detalles y unirte al evento en nuestra app haciendo clic en el siguiente enlace:\n\n<ENLACE DE TU APP>`;

//       Mailer.mail({
//         subject,
//         recipients: [],
//         body,
//         isHTML: true,
//       }, (error, event) => {
//         if (error) {
//           console.error(error);
//         }
//       });

//       setIsEventShared(true);
//       setSelectedPlan(null);
//     }
//   };

//   useEffect(() => {
//     Linking.addEventListener('url', handleOpenURL);
//     return () => {
//       Linking.removeEventListener('url', handleOpenURL);
//     };
//   }, []);

//   const handleOpenURL = (event) => {
//     // Aquí puedes manejar la lógica cuando se abre el enlace en tu aplicación
//     console.log('Enlace abierto:', event.url);
//   };
