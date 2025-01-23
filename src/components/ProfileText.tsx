import { View, Text, ViewStyle, TextStyle } from "react-native";

interface IProfileTextProps {
  text: string;
  style?: TextStyle;
  customStyle?: ViewStyle;
  customStyleText?: TextStyle;
}

export const ProfileText = ({ text }: IProfileTextProps) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "white",
          marginVertical: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
