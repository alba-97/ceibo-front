import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MultipleDropdown from "../MultipleDropdown";
import RadioButton from "../RadioButton";
import GenericButton from "../GenericButton";
import getUserFriends from "../../api/getUserFriends";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import IOption from "@/interfaces/Option";
import inviteUsers from "@/api/inviteUsers";
import handleError from "@/utils/handleError";
import fromResponseToForm from "@/utils/event/fromResponseToForm";
import { toast } from "react-toastify";
import IOptionSelect from "@/interfaces/OptionSelect";
import fromResponsesToOptionSelect from "@/utils/user/fromResponsesToOptionSelect";

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
  const [friendsDropdown, setFriendsDropdown] = useState<IOptionSelect[]>([]);
  const [invited, setInvited] = useState<string[]>([]);

  const handleChange = (option: IOption) => {
    try {
      const friendsDropdown = fromResponsesToOptionSelect(users);
      setSendMethod(option);
      setFriendsDropdown(friendsDropdown);
    } catch (err) {
      handleError(err);
    }
  };

  const handleInvite = async () => {
    try {
      const form = fromResponseToForm(event);
      await inviteUsers(invited, form, sendMethod.value);
      toast.success("Invites sent successfully");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchInfo = async () => {
    try {
      const { data } = await getUserFriends();
      setUsers(data);
      const friends = fromResponsesToOptionSelect(data);
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
        <>
          <MultipleDropdown
            data={friendsDropdown}
            selectedValues={invited}
            onSelect={(selectedItems: string[]) => {
              setInvited(selectedItems);
            }}
            placeholder="Invite friends"
          />
          <RadioButton
            options={sendMethods}
            onSelect={handleChange}
            defaultValue={sendMethod}
          />
        </>
      )}

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

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
