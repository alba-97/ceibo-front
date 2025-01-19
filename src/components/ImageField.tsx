import { StyleSheet, Text, View } from "react-native";
import UploadFile from "@/components/UploadFile";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";
import ErrorMsg from "./ErrorMsg";

interface IImageFieldProps {
  placeholder: string;
  field: string;
}

export default ({ placeholder, field }: IImageFieldProps) => {
  const { setFieldValue } = useFormikContext<EventForm>();
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <UploadFile
        onChange={(url: string) => {
          setFieldValue(field, url);
        }}
      />
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
