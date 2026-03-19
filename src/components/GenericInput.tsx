import { KeyboardTypeOptions, TextInput, TextStyle } from "react-native";
import { T } from "@/theme";

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
          fontSize: 15,
          color: T.text,
          backgroundColor: T.bgCard,
          borderRadius: T.radius.md,
          borderWidth: 1,
          borderColor: T.border,
          paddingHorizontal: 14,
          paddingVertical: 10,
          width: "80%",
          height: 48,
        },
        customStyle,
        { flexDirection: "row" },
      ]}
      placeholderTextColor={T.textMuted}
    />
  );
};
