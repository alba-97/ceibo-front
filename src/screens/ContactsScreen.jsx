// Native
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { FloatingButton } from "../components/FloatingButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/stylesContact";
import { Navbar } from "../components/Navbar";
import { AntDesign } from "@expo/vector-icons";
// Services
import { fetchContacts } from "../services/fetchContacts";
import { SingleContact } from "../components/SingleContact";
import { setSelectedContact } from "../state/selectedContact";
import { GenericButton } from "../components/GenericButton";
import iniciaSesion from '../assets/iniciaSesion.png'
export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.selectedContact);
  const user = useSelector((state) => state.user);

  const bringMeTheContacts = async () => {
    try {
      const fetchedContacts = await fetchContacts();
      setContacts(fetchedContacts);
      setFilteredContacts(fetchedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    bringMeTheContacts();
  }, []);

  const handleQueryChange = (text) => {
    setQuery(text);
    filterContacts(text);
  };

  const filterContacts = (text) => {
    const filtered = contacts?.filter(
      (contact) =>
        contact.first_name &&
        contact.first_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate("ContactInfoScreen", { selectedContact });
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.containerr}
    >
      <Navbar />
      {user?.username ? (
        <View style={styles.container}>
          <View style={styles.container3}>
            <GenericInput
              value={query}
              onChangeText={handleQueryChange}
              placeholder={"Buscar"}
              customStyle={styles.input}
            />
            <TouchableOpacity onPress={() => bringMeTheContacts()}>
              <AntDesign
                name="reload1"
                size={30}
                color="white"
                style={styles.reload}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.text1}>Contactos</Text>

          <ScrollView>
            <View>
              {filteredContacts?.map((contact, i) => (
                <Text
                  style={styles.text2}
                  key={i}
                  onPress={() => handleContactPress(contact)}
                >
                  <SingleContact {...contact} />
                </Text>
              ))}
            </View>
          </ScrollView>
          <FloatingButton />
        </View>
      ) : (
        <View style={[styles.container, { flex: 1, justifyContent: "center" }]}>
          <Text style={styles.loginText}>
            Para ver contactos, inicie sesión
          </Text>
          <View style={{ flex: 1, alignItems: "center", marginTop: "5%" }}>
          
<View style={styles.logoutContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Image style={styles.logo} source={iniciaSesion} />
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      )}
    </LinearGradient>
  );
}
