import { KeyboardTypeOptions, TextInput, TextStyle } from "react-native";

interface IGenericInputProps {
  customStyle?: TextStyle;
  placeholder?: string;
  type?: string;
  value: string | number | null;
  style?: TextStyle;
  onChangeText: (text: string) => void;
  onBlur?: (e: unknown) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing?: () => void;
}

export default ({
  customStyle,
  placeholder = "",
  value,
  ...props
}: IGenericInputProps) => {
  return (
    <TextInput
      {...props}
      value={value === null ? "" : value.toString()}
      placeholder={placeholder}
      style={[
        {
          fontSize: 16,
          color: "#F0F0F0",
          backgroundColor: "#1E1E1E",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#3A3A3A",
          paddingHorizontal: 12,
          paddingVertical: 8,
          width: "80%",
          height: 48,
        },
        customStyle,
        { flexDirection: "row" },
      ]}
      placeholderTextColor="#999"
    />
  );
};
