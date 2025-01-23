import { StyleSheet, Text, View } from "react-native";
import GenericInput from "./GenericInput";
import ErrorMsg from "./ErrorMsg";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";

interface ITextFieldProps {
  placeholder: string;
  field: string;
  secureTextEntry?: boolean;
}

const TextField = ({ placeholder, field, ...props }: ITextFieldProps) => {
  const { handleChange, handleBlur, values } = useFormikContext<EventForm>();
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>{placeholder}</Text>
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
  container: { width: "100%", alignItems: "center" },
  placeholder: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default TextField;
