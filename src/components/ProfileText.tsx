import { View, Text, ViewStyle, TextStyle } from "react-native";
import { T } from "@/theme";

interface IProfileTextProps {
  text: string;
  style?: TextStyle;
  customStyle?: ViewStyle;
  customStyleText?: TextStyle;
}

export const ProfileText = ({ text, style }: IProfileTextProps) => {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: 28,
            fontWeight: "800",
            color: T.text,
            letterSpacing: -0.5,
            marginTop: 8,
            marginBottom: 24,
          },
          style,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};
