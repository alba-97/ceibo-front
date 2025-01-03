import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";

interface IGenericButtonProps {
  text: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  customStyle?: ViewStyle | TextStyle;
  type?: string;
}

const GenericButton = ({
  onPress,
  customStyle,
  textStyle,
  text,
}: IGenericButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "rgba(225, 200, 200, 0.3)",
          borderRadius: 20,
          alignItems: "center",
          borderWidth: 2,
          borderColor: "rgba(10, 7, 7, 0.2)",
          paddingHorizontal: 15,
          paddingVertical: 15,
        },
        customStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default GenericButton;
