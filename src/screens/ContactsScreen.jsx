import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GenericInput } from "../components/GenericInput";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "../components/Navbar";

export const ContactsScreen = () => {
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
        console.log(data[0]);
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
};

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  container: {
    flex: 1,
    width: "100%",
  },

  container3: {
    paddingTop: "5%",
    paddingBottom: "4%",

    alignItems: "center",
  },

  container2: {
    width: "95%",
    paddingLeft: "5%",
  },
  text1: {
    paddingBottom: "1%",
    paddingLeft: "5%",
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  text2: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
});
