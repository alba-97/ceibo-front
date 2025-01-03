import { Text, View } from "react-native";
import ErrorMsg from "./ErrorMsg";
import DatetimePicker from "./DatetimePicker";

interface IDateFieldProps {
  placeholder: string;
  field: string;
}

const DateField = ({ placeholder, field }: IDateFieldProps) => {
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
      <DatetimePicker field={field} />
      <ErrorMsg field={field} />
    </View>
  );
};

export default DateField;
