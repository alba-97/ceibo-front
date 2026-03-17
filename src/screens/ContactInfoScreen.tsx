import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "../components/GenericButton";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import ProfilePicture from "../components/ProfilePicture";
import { ProfileText } from "../components/ProfileText";
import addFriend from "../api/addFriend";
import removeFriend from "../api/removeFriend";
import getUserFriends from "../api/getUserFriends";
import { RootState } from "@/state/store";
import handleError from "@/utils/handleError";

const windowWidth = Dimensions.get("window").width;

export default function ContactInfoScreen() {
  const contact = useSelector((state: RootState) => state.selectedContact);
  const { _id, first_name, last_name, address, phone, username, email } =
    contact;
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFriend, setIsFriend] = useState<boolean>(true);

  const fullName = `${first_name}  ${last_name}`;
  const birthdate = contact?.birthdate?.split("-");
  const formattedBirthdate = `${birthdate[2]?.split("T")[0]} / ${
    birthdate[1]
  } / ${birthdate[0]}`;

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
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      setLoading(true);
      await removeFriend(user._id, friendId);
      setLoading(false);
      setIsFriend(false);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Navbar />
      <ScrollView style={{ marginTop: "15%" }}>
        <View style={styles.container}>
          <ProfilePicture imageSource={contact.profile_img} />
          <View style={{ marginTop: "5%" }}></View>
          <ProfileText style={styles.text} text={username} />
          <ProfileText style={styles.text} text={`Nombre: ${fullName}`} />
          {birthdate ? (
            <ProfileText
              style={styles.text}
              text={`Cumpleaños: ${formattedBirthdate}`}
            />
          ) : (
            ""
          )}
          {phone ? (
            <ProfileText style={styles.text} text={`Teléfono: ${phone}`} />
          ) : (
            ""
          )}
          {email ? (
            <ProfileText style={styles.text} text={`Email: ${email}`} />
          ) : (
            ""
          )}
          {address ? (
            <ProfileText style={styles.text} text={`Dirección: ${address}`} />
          ) : (
            ""
          )}
          <View style={{ alignItems: "center" }}>
            {!loading ? (
              <>
                {!isFriend ? (
                  <GenericButton
                    text={"Agregar amigo"}
                    onPress={() => handleAddFriend(_id)}
                    buttonStyle={{ marginTop: "4%" }}
                  />
                ) : (
                  <GenericButton
                    text={"Eliminar amigo"}
                    onPress={() => handleRemoveFriend(_id)}
                    buttonStyle={{ marginTop: "4%" }}
                  />
                )}
              </>
            ) : (
              <GenericButton
                text={"Cargando..."}
                buttonStyle={{ marginTop: "4%", backgroundColor: "#2D2D2D" }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderStyle: "solid",
    width: windowWidth,
    justifyContent: "center",
  },
  text: {
    color: "#F0F0F0",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
    textAlign: "center",
  },
});
