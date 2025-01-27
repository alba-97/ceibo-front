import { StyleSheet, Text, View } from "react-native";
import ErrorMsg from "./ErrorMsg";
import DatetimePicker from "./DatetimePicker";

interface IDateFieldProps {
  placeholder: string;
  field: string;
  dateOnly?: boolean;
}

export default ({ placeholder, field, dateOnly }: IDateFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <DatetimePicker field={field} dateOnly={dateOnly} />
      <ErrorMsg field={field} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  placeholder: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
