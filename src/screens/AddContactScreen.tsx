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
import { T } from "@/theme";

export default function AddContactScreen() {
  const [contacts, setContacts] = useState<UserResponse[]>([]);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<UserResponse[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const selectedContact = useSelector(
    (state: RootState) => state.selectedContact,
  );

  const handleBack = () => {
    navigation.navigate("contacts");
  };

  const filterContacts = () => {
    if (query) {
      setFilteredContacts(
        contacts.filter((c) =>
          c.username?.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredContacts([]);
    }
  };

  const handleContactPress = (contact: UserResponse) => {
    dispatch(setSelectedContact(contact));
    navigation.navigate("contact-info", { selectedContact });
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
    <AppGradient style={styles.root}>
      <Navbar />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="back" size={20} color={T.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Friends</Text>
        </View>

        <View style={styles.searchRow}>
          <GenericInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by username..."
            customStyle={styles.searchInput}
          />
          <TouchableOpacity
            onPress={filterContacts}
            style={styles.searchButton}
          >
            <Feather name="arrow-right" size={18} color={T.bg} />
          </TouchableOpacity>
        </View>

        {filteredContacts.length > 0 ? (
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {filteredContacts.map((contact, i) => (
              <TouchableOpacity
                key={i}
                style={styles.contactRow}
                onPress={() => handleContactPress(contact)}
              >
                <SingleContact {...contact} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Find someone</Text>
            <Text style={styles.emptyText}>
              Search by username and tap the arrow to see results
            </Text>
          </View>
        )}
      </View>
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
    gap: 14,
    marginTop: 24,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: T.bgCard,
    borderRadius: T.radius.sm,
    padding: 8,
    borderWidth: 1,
    borderColor: T.border,
  },
  title: {
    color: T.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    width: undefined,
  },
  searchButton: {
    backgroundColor: T.accent,
    borderRadius: T.radius.md,
    padding: 14,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
  },
  contactRow: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: T.text,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  emptyText: {
    color: T.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
