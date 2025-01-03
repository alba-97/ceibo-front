import { Text, View } from "react-native";
import GenericInput from "./GenericInput";
import ErrorMsg from "./ErrorMsg";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";

interface ITextFieldProps {
  placeholder: string;
  field: string;
}

const TextField = ({ placeholder, field }: ITextFieldProps) => {
  const { handleChange, handleBlur, values } = useFormikContext<EventForm>();
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text
        style={{
          color: "#FFF",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        {placeholder}
      </Text>

      <GenericInput
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field)}
        value={values[field as keyof EventForm] as string | number | null}
      />
      <ErrorMsg field={field} />
    </View>
  );
};

export default TextField;
