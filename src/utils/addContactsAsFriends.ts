import getUserFriends from "../api/getUserFriends";
import addFriend from "../api/addFriend";
import UserResponse from "@/interfaces/responses/User";
import { fetchContacts } from "@/utils/fetchContacts";

const findMissingContacts = (
  contacts: UserResponse[],
  friends: UserResponse[]
) => {
  const missingContacts = [];
  for (const contact of contacts) {
    if (!friends.some((friend) => friend._id === contact._id)) {
      missingContacts.push(contact);
    }
  }
  return missingContacts;
};

export const addContactsAsFriends = async () => {
  const contacts = await fetchContacts();
  const friends = await getUserFriends();
  const missingContacts = findMissingContacts(contacts, friends);
  for (const contact of missingContacts) {
    contact._id && (await addFriend(contact._id));
  }
};
