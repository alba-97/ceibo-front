// Native
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/stylesContact";
import { Navbar } from "../components/Navbar";
import { AntDesign } from "@expo/vector-icons";
// Services
import { fetchContacts } from "../services/fetchContacts";
import { SingleContact } from "../components/SingleContact";
import { setSelectedContact } from "../state/selectedContact";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.selectedContact);

  const bringMeTheContacts = async () => {
    try {
      setContacts(await fetchContacts());
      setFilteredContacts(await fetchContacts());
    } catch (error) {
      console.log("error useEffect contactsScreen", error);
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
    console.log("contact", contact);
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
      </View>
    </LinearGradient>
  );
}
