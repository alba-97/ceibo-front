import { Text, View } from "react-native";
import { styles } from "../styles/contactText";

interface ISingleContactProps {
  phone: string;
  username: string;
}

export const SingleContact = ({ phone, username }: ISingleContactProps) => {
  return (
    <View style={styles.contactText}>
      <Text style={styles.usernameText}>{username}</Text>
      <Text style={styles.phoneText}>{phone}</Text>
    </View>
  );
};
