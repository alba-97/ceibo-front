import { styles } from "../styles/ProfileTextStyles";
import { View, Text, ViewStyle, TextStyle } from "react-native";

interface IProfileTextProps {
  text: string;
  customStyle: ViewStyle;
  customStyleText?: TextStyle;
}

export const ProfileText = ({
  text,
  customStyle,
  customStyleText,
}: IProfileTextProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={[styles.text, customStyleText]}>{text}</Text>
    </View>
  );
};
