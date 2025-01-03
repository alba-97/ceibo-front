import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FloatingButton } from "../components/FloatingButton";
import GenericInput from "../components/GenericInput";
import { styles } from "../styles/stylesContact";
import { AntDesign } from "@expo/vector-icons";
import { Navbar } from "../components/Navbar";
import { setSelectedContact } from "../state/selectedContact";
import { SingleContact } from "../components/SingleContact";
import iniciaSesion from "../assets/iniciaSesion.png";
import getUserFriends from "../api/getUserFriends";
import { setContacts } from "../state/contacts";
import amigos from "../assets/amigos.png";
import { RootState } from "@/state/store";
import UserResponse from "@/interfaces/responses/User";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";

export default function ContactsScreen() {
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<UserResponse[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const contacts = useSelector((state: RootState) => state.contacts);

  const fetchFriends = async () => {
    try {
      const friends = await getUserFriends();
      dispatch(setContacts(friends));
      setFilteredContacts(friends);
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
    navigation.navigate("ContactInfoScreen");
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
            <TouchableOpacity onPress={fetchFriends}>
              <AntDesign
                name="reload1"
                size={30}
                color="white"
                style={styles.reload}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.logoCont}>
            <Image style={styles.logo1} source={amigos} />
          </View>
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
