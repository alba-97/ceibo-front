import { useEffect, useState } from "react";
import { View } from "react-native";
import MultipleDropdown from "../MultipleDropdown";
import RadioButton from "../RadioButton";
import { styles } from "../../styles/EventDetails";
import GenericButton from "../GenericButton";
import getUserFriends from "../../api/getUserFriends";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import IOption from "@/interfaces/Option";
import fromUserResponsesToOptions from "@/utils/user/fromUserResponsesToOptions";
import inviteUsers from "@/api/inviteUsers";
import fromOptionstoStringArray from "@/utils/fromOptionsToStringArray";
import handleError from "@/utils/handleError";
import fromResponseToForm from "@/utils/event/fromResponseToForm";
import { toast } from "react-toastify";

interface IEventInviteProps {
  event: EventResponse;
}

const sendMethods: IOption[] = [
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "phone" },
];

const EventInvite = ({ event }: IEventInviteProps) => {
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
      const form = fromResponseToForm(event);
      await inviteUsers(users, form, sendMethod.value);
      toast.success("Invites sent successfully");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchInfo = async () => {
    try {
      const { data } = await getUserFriends();
      setUsers(data);
      const friends = fromUserResponsesToOptions(data);
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
      {friendsDropdown[0] && (
        <MultipleDropdown
          setSelected={(val) => setInvited(val)}
          data={friendsDropdown}
          save="value"
          onSelect={() => {}}
          label="Invite friends"
          placeholder="Invite friends"
          search={false}
          textStyles={styles.item}
          boxStyles={styles.dropdown}
          dropdownStyles={styles.dropdown}
          badgeStyles={styles.item}
        />
      )}
      <RadioButton
        options={sendMethods}
        onSelect={handleChange}
        defaultValue={sendMethod}
      />
      {invited[0] && (
        <GenericButton
          text={"Invite"}
          buttonStyle={{ marginHorizontal: 50 }}
          onPress={handleInvite}
        />
      )}
    </View>
  );
};

export default EventInvite;
