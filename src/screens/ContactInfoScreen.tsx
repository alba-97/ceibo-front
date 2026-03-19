import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "../components/GenericButton";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import ProfilePicture from "../components/ProfilePicture";
import addFriend from "../api/addFriend";
import removeFriend from "../api/removeFriend";
import getUserFriends from "../api/getUserFriends";
import { RootState } from "@/state/store";
import handleError from "@/utils/handleError";
import { T } from "@/theme";

export default function ContactInfoScreen() {
  const contact = useSelector((state: RootState) => state.selectedContact);
  const { _id, first_name, last_name, address, phone, username, email } =
    contact;
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFriend, setIsFriend] = useState<boolean>(true);

  const birthdate = contact?.birthdate?.split("-");
  const formattedBirthdate = birthdate
    ? `${birthdate[2]?.split("T")[0]} / ${birthdate[1]} / ${birthdate[0]}`
    : null;

  const isAlreadyFriend = async () => {
    try {
      const { data: friends } = await getUserFriends();
      setIsFriend(friends.some((friend) => friend._id === contact._id));
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    isAlreadyFriend();
  }, [user._id, contact]);

  const handleAddFriend = async (friendId: string) => {
    try {
      setLoading(true);
      await addFriend(friendId);
      setIsFriend(true);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      setLoading(true);
      await removeFriend(user._id, friendId);
      setIsFriend(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <Navbar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.avatarSection}>
          <ProfilePicture imageSource={contact.profile_img} />
          <Text style={styles.name}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.username}>@{username}</Text>
        </View>

        <View style={styles.infoCard}>
          {formattedBirthdate && (
            <InfoRow label="Birthday" value={formattedBirthdate} />
          )}
          {phone && <InfoRow label="Phone" value={phone} />}
          {email && <InfoRow label="Email" value={email} />}
          {address && <InfoRow label="Address" value={address} />}
        </View>

        <View style={styles.actions}>
          {loading ? (
            <GenericButton
              text="Loading..."
              buttonStyle={styles.ghostButton}
              textStyle={{ color: T.textMuted }}
            />
          ) : isFriend ? (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFriend(_id)}
            >
              <Text style={styles.removeButtonText}>Remove Friend</Text>
            </TouchableOpacity>
          ) : (
            <GenericButton
              text="Add Friend"
              onPress={() => handleAddFriend(_id)}
              buttonStyle={styles.addButton}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={infoRowStyles.row}>
      <Text style={infoRowStyles.label}>{label}</Text>
      <Text style={infoRowStyles.value}>{value}</Text>
    </View>
  );
}

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  label: {
    color: T.textMuted,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  value: {
    color: T.text,
    fontSize: 13,
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: T.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  name: {
    color: T.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginTop: 14,
  },
  username: {
    color: T.textMuted,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  infoCard: {
    marginHorizontal: 20,
    backgroundColor: T.bgCard,
    borderRadius: T.radius.lg,
    borderWidth: 1,
    borderColor: T.border,
    overflow: "hidden",
    marginBottom: 24,
  },
  actions: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  addButton: {
    width: "80%",
    paddingVertical: 16,
  },
  ghostButton: {
    width: "80%",
    paddingVertical: 16,
    backgroundColor: T.bgCard,
    borderWidth: 1,
    borderColor: T.border,
  },
  removeButton: {
    width: "80%",
    paddingVertical: 16,
    borderRadius: T.radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF5C5C",
  },
  removeButtonText: {
    color: "#FF5C5C",
    fontSize: 15,
    fontWeight: "600",
  },
});
