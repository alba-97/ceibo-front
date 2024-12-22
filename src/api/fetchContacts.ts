import * as Contacts from "expo-contacts";
import { getAllUsers } from "./getAllUsers";

const getContactNumbers = (data: Contacts.Contact[]) => {
  const phoneNumbers = [];
  for (let i = 0; i < data.length; i++) {
    const contact = data[i];
    if (contact.phoneNumbers) {
      const phoneNumber = contact.phoneNumbers[0]?.number;
      if (phoneNumber) phoneNumbers.push(phoneNumber);
    }
  }
  return phoneNumbers;
};

const filterContacts = async (phoneNumbers: string[]) => {
  const users = await getAllUsers();
  const filteredPhoneNumbers = [];

  for (const user of users) {
    if (user.phone) {
      if (phoneNumbers.includes(user.phone)) filteredPhoneNumbers.push(user);
    }
  }
  return filteredPhoneNumbers;
};

export const fetchContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== "granted") return [];
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.PhoneNumbers],
  });
  const phoneNumbers = getContactNumbers(data);
  const filteredContacts = await filterContacts(phoneNumbers);
  console.log("filtered contacts", filteredContacts);
  return filteredContacts;
};
