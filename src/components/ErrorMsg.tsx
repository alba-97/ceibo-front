import { ErrorMessage } from "formik";
import { Text } from "react-native";

export default ({ field }: { field: string }) => {
  return (
    <Text style={{ color: "white", fontSize: 24, marginVertical: 20 }}>
      <ErrorMessage name={field} />
    </Text>
  );
};
