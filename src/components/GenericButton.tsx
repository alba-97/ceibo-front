import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";
import { T } from "@/theme";

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
        backgroundColor: T.accent,
        borderRadius: T.radius.md,
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 28,
        ...buttonStyle,
      }}
      {...props}
    >
      <Text
        style={{
          color: T.bg,
          fontSize: 15,
          fontWeight: "700",
          letterSpacing: 0.5,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default GenericButton;
