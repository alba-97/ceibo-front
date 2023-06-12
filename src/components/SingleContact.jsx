import { Text } from "react-native";

export const SingleContact = ({ first_name, last_name, phone }) => {
  return <Text>{`${first_name} ${last_name} ${phone}`}</Text>;
};
