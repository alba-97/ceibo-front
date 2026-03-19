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
import { T } from "@/theme";

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

  useEffect(() => {
    try {
      fetchFriends();
    } catch (err) {
      handleError(err);
    }
  }, [user]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    const filtered = contacts?.filter(
      (c) =>
        c.username && c.username.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact: UserResponse) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate("contact-info");
  };

  return (
    <AppGradient style={styles.root}>
      <Navbar />
      {user?.username ? (
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.count}>{filteredContacts.length}</Text>
            </View>
            <TouchableOpacity
              onPress={fetchFriends}
              style={styles.refreshButton}
            >
              <AntDesign name="reload1" size={18} color={T.accent} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchRow}>
            <GenericInput
              value={query}
              onChangeText={handleQueryChange}
              placeholder="Search friends..."
              customStyle={styles.searchInput}
            />
          </View>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {filteredContacts?.map((contact, i) => (
              <TouchableOpacity
                key={i}
                style={styles.contactRow}
                onPress={() => handleContactPress(contact)}
              >
                <SingleContact {...contact} />
              </TouchableOpacity>
            ))}
            {filteredContacts.length === 0 && (
              <Text style={styles.emptyText}>No friends found</Text>
            )}
          </ScrollView>
          <FloatingButton />
        </View>
      ) : (
        <View style={styles.guestState}>
          <Text style={styles.guestTitle}>Sign in to see your friends</Text>
          <Text style={styles.guestSub}>
            Connect with people in your network
          </Text>
          <GenericButton
            text="Sign In"
            onPress={() => navigation.navigate("login")}
            buttonStyle={styles.guestButton}
          />
        </View>
      )}
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 16,
  },
  titleBlock: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  title: {
    color: T.text,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  count: {
    color: T.accent,
    fontSize: 16,
    fontWeight: "700",
  },
  refreshButton: {
    backgroundColor: T.accentDim,
    borderRadius: T.radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: T.borderAccent,
  },
  searchRow: {
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
  },
  list: {
    flex: 1,
  },
  contactRow: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  emptyText: {
    color: T.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 32,
  },
  guestState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  guestTitle: {
    color: T.text,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.3,
  },
  guestSub: {
    color: T.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  guestButton: {
    paddingHorizontal: 40,
  },
});
