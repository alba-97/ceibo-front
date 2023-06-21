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
import { Feather, AntDesign } from "@expo/vector-icons";
// Services
import { SingleContact } from "../components/SingleContact";
import { setSelectedContact } from "../state/selectedContact";
import { GenericButton } from "../components/GenericButton";
import { getAllUsers } from "../services/getAllUsers";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.selectedContact);
  const user = useSelector((state) => state.user);

  const handleBack = () => {
    navigation.navigate("Contacts");
  };

  const handleQueryChange = (text) => {
    setQuery(text);
  };

  const filterContacts = () => {
    if (query) {
      setFilteredContacts(
        contacts.filter(
          (contact) =>
            contact.username &&
            contact.username.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else if (query === "") {
      setFilteredContacts([]);
    }
  };

  const handleContactPress = (contact) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate("ContactInfoScreen", { selectedContact });
  };

  useEffect(() => {
    getAllUsers().then((users) => {
      setContacts(users);
    });
  }, []);

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
          <TouchableOpacity onPress={handleBack}>
            <AntDesign
              name="back"
              size={30}
              color="white"
              style={{ marginLeft: "4%" }}
            />
          </TouchableOpacity>
          <GenericInput
            value={query}
            onChangeText={handleQueryChange}
            placeholder={"Buscar"}
          />
          <TouchableOpacity onPress={() => filterContacts()}>
            <Feather
              name="arrow-right"
              size={30}
              color="white"
              style={{ marginLeft: "5%" }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text1}>Agregar Contactos</Text>
        {filteredContacts[0] ? (
          <ScrollView>
            <View>
              {filteredContacts.map((contact, i) => (
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
        ) : (
          <Text>Para buscar un contacto, use el buscador</Text>
        )}
      </View>
    </LinearGradient>
  );
}
