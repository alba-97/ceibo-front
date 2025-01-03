import EventForm from "@/interfaces/forms/Event";
import { useFormikContext } from "formik";
import { Text, View } from "react-native";
import DatetimePicker from "./DatetimePicker";
import ErrorMsg from "./ErrorMsg";

interface IDateFieldProps {
  placeholder: string;
  field: string;
}

const DateField = ({ placeholder, field }: IDateFieldProps) => {
  const { values, setFieldValue } = useFormikContext<EventForm>();
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
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
      <DatetimePicker
        date={values[field as keyof EventForm] as string}
        onChange={(date: string) => {
          setFieldValue(field, date);
        }}
      />
      <ErrorMsg field={field} />
    </View>
  );
};

export default DateField;
