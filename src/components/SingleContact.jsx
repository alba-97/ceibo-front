import { Text } from "react-native";

export const SingleContact = ({ phone, username }) => {
  // return <Text>{`${first_name} ${last_name} ${phone}`}</Text>;
  return (
    <Text>
      {username} {phone}
    </Text>
  );
};
