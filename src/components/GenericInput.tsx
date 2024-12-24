import { KeyboardTypeOptions, TextInput, TextStyle } from "react-native";
import { styles } from "../styles/genericInputStyles";

interface IGenericInputProps {
  customStyle?: TextStyle;
  placeholder?: string;
  value: string;
  style?: TextStyle;
  onChangeText: (text: string) => void;
  onBlur: (e: unknown) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing?: () => void;
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
