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
        backgroundColor: "#22001b",
        borderRadius: 20,
        alignItems: "center",
        padding: 15,
        borderWidth: 2,
        borderColor: "#140311",
        boxShadow: "0 4px 6px #2c0023",
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
