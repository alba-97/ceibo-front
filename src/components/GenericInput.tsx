import { TextInput, TextStyle } from "react-native";
import { styles } from "../styles/genericInputStyles";

interface IGenericInputProps {
  customStyle?: TextStyle;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const GenericInput = ({
  customStyle,
  placeholder = "",
  ...props
}: IGenericInputProps) => {
  return (
    <TextInput
      {...props}
      placeholder={placeholder}
      style={[styles.input, customStyle, { flexDirection: "row" }]}
      placeholderTextColor="#999"
    />
  );
};
