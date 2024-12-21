import { ParamListBase, useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/stylesContact";
import { Navbar } from "../components/Navbar";
import { Feather, AntDesign } from "@expo/vector-icons";
import { SingleContact } from "../components/SingleContact";
import { setSelectedContact } from "../state/selectedContact";
import { getAllUsers } from "../api/getAllUsers";
import busqueElContacto from "../assets/busqueElContacto.png";
import agregarAmigo from "../assets/agregarAmigo.png";
import { RootState } from "@/state/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UserResponse from "@/interfaces/responses/User";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<UserResponse[]>([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<UserResponse[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const selectedContact = useSelector(
    (state: RootState) => state.selectedContact
  );

  const handleBack = () => {
    navigation.navigate("Contacts");
  };

  const handleQueryChange = (text: string) => {
    setQuery(text);
  };

  const filterContacts = () => {
    if (query) {
      setFilteredContacts(
        contacts.filter((contact: UserResponse) =>
          contact.username?.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else if (query === "") {
      setFilteredContacts([]);
    }
  };

  const handleContactPress = (contact: UserResponse) => {
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
        <View style={styles.logoCont}>
          <Image style={styles.logo2} source={agregarAmigo} />
        </View>

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
                  marginTop: "30%",
                  fontSize: 20,
                },
              ]}
            >
              <Image style={styles.logo3} source={busqueElContacto} />
            </Text>
            <View
              style={{
                alignItems: "center",
                paddingBottom: "1%",
                paddingTop: "2%",
              }}
            ></View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}
