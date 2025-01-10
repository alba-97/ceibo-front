import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";

interface IGenericButtonProps {
  text: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  type?: string;
}

const GenericButton = ({
  onPress,
  text,
  buttonStyle,
  textStyle,
}: IGenericButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#22001b",
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(10, 7, 7, 0.2)",
        paddingHorizontal: 15,
        paddingVertical: 15,
        ...buttonStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default GenericButton;
