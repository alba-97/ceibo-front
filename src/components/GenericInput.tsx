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
          color: "white",
          backgroundColor: "#22001b",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "white",
          paddingHorizontal: 10,
          paddingVertical: 8,
          width: "80%",
          height: 64,
        },
        customStyle,
        { flexDirection: "row" },
      ]}
      placeholderTextColor="#999"
    />
  );
};
