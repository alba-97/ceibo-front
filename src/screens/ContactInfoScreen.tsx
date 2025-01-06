import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "../components/GenericButton";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import { ProfilePicture } from "../components/ProfilePicture";
import { ProfileText } from "../components/ProfileText";
import { styles } from "../styles/ProfileTextStyles";
import addFriend from "../api/addFriend";
import removeFriend from "../api/removeFriend";
import getUserFriends from "../api/getUserFriends";
import { RootState } from "@/state/store";
import handleError from "@/utils/handleError";

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
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        flex: 1,
      }}
    >
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
                    customStyle={{ marginTop: "4%" }}
                  />
                ) : (
                  <GenericButton
                    text={"Eliminar amigo"}
                    onPress={() => handleRemoveFriend(_id)}
                    customStyle={{ marginTop: "4%" }}
                  />
                )}
              </>
            ) : (
              <GenericButton
                text={"Cargando..."}
                customStyle={{ marginTop: "4%", backgroundColor: "#7D0166" }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
