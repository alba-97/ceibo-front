import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MultipleDropdown from "../MultipleDropdown";
import RadioButton from "../RadioButton";
import { styles } from "../../styles/PlanDetails";
import GenericButton from "../GenericButton";
import getUserFriends from "../../api/getUserFriends";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import IOption from "@/interfaces/Option";
import fromUserResponsesToOptions from "@/utils/user/fromUserResponsesToOptions";
import inviteUsers from "@/api/inviteUsers";
import fromOptionstoStringArray from "@/utils/fromOptionsToStringArray";
import handleError from "@/utils/handleError";

interface IPlanInviteProps {
  plan: EventResponse;
}

const PlanInvite = ({ plan }: IPlanInviteProps) => {
  const sendMethods: IOption[] = [
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "phone" },
  ];
  const [sendMethod, setSendMethod] = useState<IOption>(sendMethods[0]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [friendsDropdown, setFriendsDropdown] = useState<IOption[]>([]);
  const [invited, setInvited] = useState<IOption[]>([]);

  const handleChange = (option: IOption) => {
    try {
      const friendsDropdown = fromUserResponsesToOptions(users);
      setSendMethod(option);
      setFriendsDropdown(friendsDropdown);
    } catch (err) {
      handleError(err);
    }
  };

  const handleInvite = async () => {
    try {
      const users = fromOptionstoStringArray(invited);
      await inviteUsers(users, plan, sendMethod.value);
      Alert.alert("OK", "Invitaciones enviadas");
    } catch (err) {
      Alert.alert("Error", "Hubo un problema al enviar invitaciones");
    }
  };

  const fetchInfo = async () => {
    try {
      const users = await getUserFriends();
      setUsers(users);
      const friends = fromUserResponsesToOptions(users);
      setFriendsDropdown(friends);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View style={styles.input}>
      <MultipleDropdown
        setSelected={(val) => setInvited(val)}
        data={friendsDropdown}
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
      {invited[0] && (
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
