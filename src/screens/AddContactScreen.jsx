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
import { getAllUsers } from "../services/getAllUsers";
import { GenericButton } from "../components/GenericButton";
import { addContactsAsFriends } from "../services/addContactsAsFriends";
import { fetchContacts } from "../services/fetchContacts";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.selectedContact);

  const handleBack = () => {
    navigation.navigate("Contacts");
  };

  const handleQueryChange = (text) => {
    setQuery(text);
  };

  const handleAddContactsFriends = async () => {
    await addContactsAsFriends();
    navigation.navigate("Contacts");
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
        <Text style={styles.text1}>Agregar Amigos</Text>
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
          <>
            <Text
              style={[
                styles.text2,
                {
                  flex: 1,
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "50%",
                  fontSize: 20,
                },
              ]}
            >
              Busque el contacto que desea agregar
            </Text>
            <View
              style={{
                alignItems: "center",
                paddingBottom: "5%",
                paddingTop: "5%",
              }}
            >
              <GenericButton
                text="Agregar contactos telefónicos como amigos"
                onPress={handleAddContactsFriends}
                textStyle={{ fontSize: 15 }}
                customStyle={{ width: "95%" }}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}
