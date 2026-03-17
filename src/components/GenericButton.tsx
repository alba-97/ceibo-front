import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";

interface IGenericButtonProps {
  text: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  type?: string;
  disabled?: boolean;
}

const GenericButton = ({
  text,
  buttonStyle,
  textStyle,
  ...props
}: IGenericButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#2D2D2D",
        borderRadius: 10,
        alignItems: "center",
        padding: 15,
        borderWidth: 1,
        borderColor: "#3A3A3A",
        ...buttonStyle,
      }}
      {...props}
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
