import { StyleSheet, Text, View } from "react-native";
import GenericInput from "./GenericInput";
import ErrorMsg from "./ErrorMsg";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";
import { T } from "@/theme";

interface ITextFieldProps {
  placeholder: string;
  field: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
}

const TextField = ({ placeholder, field, ...props }: ITextFieldProps) => {
  const { handleChange, handleBlur, values } = useFormikContext<EventForm>();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholder}</Text>
      <GenericInput
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field)}
        value={values[field as keyof EventForm] as string | number | null}
        {...props}
      />
      <ErrorMsg field={field} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", marginBottom: 16 },
  label: {
    color: T.textMuted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    textAlign: "left",
    width: "80%",
    marginBottom: 6,
  },
});

export default TextField;
