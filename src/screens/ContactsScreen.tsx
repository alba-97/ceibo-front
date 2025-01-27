import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FloatingButton } from "../components/FloatingButton";
import GenericInput from "../components/GenericInput";
import { AntDesign } from "@expo/vector-icons";
import { Navbar } from "../components/Navbar";
import { setSelectedContact } from "../state/selectedContact";
import SingleContact from "../components/SingleContact";
import getUserFriends from "../api/getUserFriends";
import { setContacts } from "../state/contacts";
import { RootState } from "@/state/store";
import UserResponse from "@/interfaces/responses/User";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import GenericButton from "@/components/GenericButton";
import AppGradient from "@/components/AppGradient";

export default function ContactsScreen() {
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<UserResponse[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const contacts = useSelector((state: RootState) => state.contacts);

  const fetchFriends = async () => {
    try {
      const { data } = await getUserFriends();
      dispatch(setContacts(data));
      setFilteredContacts(data);
    } catch (err) {
      handleError(err);
    }
  };

  const handleFetch = async () => {
    try {
      await fetchFriends();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    try {
      handleFetch();
    } catch (err) {
      handleError(err);
    }
  }, [user]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    filterContacts(text);
  };

  const filterContacts = (text: string) => {
    const filtered = contacts?.filter(
      (contact) =>
        contact.username &&
        contact.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact: UserResponse) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate("contact-info");
  };

  return (
    <AppGradient style={styles.container}>
      <Navbar />
      {user?.username ? (
        <View style={styles.container}>
          <View style={styles.container2}>
            <GenericInput
              value={query}
              onChangeText={handleQueryChange}
              placeholder={"Buscar"}
              customStyle={styles.input}
            />
            <TouchableOpacity onPress={fetchFriends}>
              <AntDesign
                name="reload1"
                size={30}
                color="white"
                style={styles.reload}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.logoText}>Amigos</Text>
          <ScrollView>
            <View>
              {filteredContacts?.map((contact, i) => (
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
          <FloatingButton />
        </View>
      ) : (
        <View style={[styles.container, { flex: 1, justifyContent: "center" }]}>
          <Text style={styles.loginText}>
            Para ver contactos, inicie sesión
          </Text>
          <View style={{ flex: 1, alignItems: "center", marginTop: "5%" }}>
            <GenericButton
              text="Login"
              onPress={() => navigation.navigate("login")}
              textStyle={{
                fontFamily: "Melts",
                fontSize: 30,
                color: "white",
                textShadowOffset: { width: 5, height: 5 },
                textShadowColor: "#770022",
              }}
            />
          </View>
        </View>
      )}
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
  loginText: {
    paddingBottom: "1%",
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
    textAlign: "center",
  },
  input: {
    marginLeft: "5%",
  },
  reload: {
    marginLeft: "15%",
  },
});
