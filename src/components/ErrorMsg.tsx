import { useFormikContext } from "formik";
import { Text } from "react-native";

export default ({ field }: { field: string }) => {
  const { errors, submitCount } = useFormikContext<Record<string, unknown>>();
  if (submitCount === 0 || !errors[field]) return null;
  return (
    <Text style={{ color: "white", fontSize: 24, marginVertical: 20 }}>
      {errors[field] as string}
    </Text>
  );
};
