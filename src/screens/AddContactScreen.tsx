import { ParamListBase, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GenericInput from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { Feather, AntDesign } from "@expo/vector-icons";
import SingleContact from "../components/SingleContact";
import { setSelectedContact } from "../state/selectedContact";
import getAllUsers from "../api/getAllUsers";
import { RootState } from "@/state/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UserResponse from "@/interfaces/responses/User";
import handleError from "@/utils/handleError";
import AppGradient from "@/components/AppGradient";

export default function AddContactScreen() {
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
    navigation.navigate("ContactInfo", { selectedContact });
  };

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setContacts(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AppGradient style={styles.container}>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.container2}>
          <TouchableOpacity onPress={handleBack}>
            <AntDesign
              name="back"
              size={30}
              color="white"
              style={styles.icon}
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
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.logoText}>Add friends</Text>

        {filteredContacts[0] ? (
          <ScrollView>
            <View>
              {filteredContacts.map((contact, i) => (
                <Text
                  style={styles.text}
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
            <Text style={styles.logoText}>Search Contacts</Text>
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
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  container2: {
    paddingTop: "5%",
    paddingBottom: "4%",
    alignItems: "center",
    flexDirection: "row",
  },
  logoText: {
    fontFamily: "Melts",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
    marginBottom: 20,
    marginTop: 30,
    fontSize: 40,
    textAlign: "center",
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  icon: { marginLeft: "4%" },
});
