import { Text } from "react-native";

export const SingleContact = ({ first_name, last_name, phone, username }) => {
  // return <Text>{`${first_name} ${last_name} ${phone}`}</Text>;
  return (
    <Text>
      {username} {phone}
    </Text>
  );
};
