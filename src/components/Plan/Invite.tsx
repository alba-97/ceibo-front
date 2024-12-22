import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MultipleDropdown from "../MultipleDropdown";
import RadioButton from "../RadioButton";
import { styles } from "../../styles/PlanDetails";
import GenericButton from "../GenericButton";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getUserFriends } from "../../api/getUserFriends";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import IOption from "@/interfaces/Option";

interface IPlanInviteProps {
  plan: EventResponse;
}

const PlanInvite = ({ plan }: IPlanInviteProps) => {
  const sendMethods = [
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "phone" },
  ];
  const [sendMethod, setSendMethod] = useState<IOption>(sendMethods[0]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [friends, setFriends] = useState<IOption[]>([]);
  const [invited, setInvited] = useState<IOption[]>([]);

  const handleChange = (option: IOption) => {
    try {
      const friends = users.map((item) => ({
        label: item.username,
        value: item.email,
      }));
      setSendMethod(option);
      setFriends(friends);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/users/invite`,
          {
            users: invited,
            plan,
            method: sendMethod.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("OK", "Invitaciones enviadas");
      } else {
        Alert.alert("Error", "Error de autenticación");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar invitaciones");
    }
  };

  const fetchInfo = async () => {
    try {
      let users = await getUserFriends();
      setUsers(users);

      const friends = users
        .filter((item) => item.email)
        .map((item) => ({
          label: item.username,
          value: item.email,
        }));
      setFriends(friends);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View style={styles.input}>
      <MultipleDropdown
        setSelected={(val) => setInvited(val)}
        data={friends}
        save="value"
        onSelect={() => {}}
        label="Invitar personas"
        placeholder="Invitar personas"
        search={false}
        textStyles={styles.item}
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdown}
        badgeStyles={styles.item}
      />
      <RadioButton
        options={sendMethods}
        onSelect={handleChange}
        defaultValue={sendMethod}
      />
      {invited && invited[0] && (
        <GenericButton
          text={"Invitar"}
          customStyle={{ marginHorizontal: 50 }}
          onPress={handleInvite}
        />
      )}
    </View>
  );
};

export default PlanInvite;
