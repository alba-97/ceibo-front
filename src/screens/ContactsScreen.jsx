// Native
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
// Components
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/stylesContact";
import { Navbar } from "../components/Navbar";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
        setFilteredContacts(data);
      }
    };

    fetchContacts();
  }, []);

  const handleQueryChange = (text) => {
    setQuery(text);
    filterContacts(text);
  };
  const filterContacts = (text) => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };
  const handleContactPress = (contact) => {
    navigation.navigate("ContactInfoScreen", { contact });
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
          />
        </View>
        <Text style={styles.text1}>Contactos</Text>

        <ScrollView>
          <View style={styles.container2}>
            {filteredContacts?.map((contact, i) => (
              <Text
                style={styles.text2}
                key={i}
                onPress={() => handleContactPress(contact)}
              >
                {contact.name}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
