import { Text, View } from "react-native";
import UploadFile from "@/components/UploadFile";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";
import ErrorMsg from "./ErrorMsg";

interface IImageFieldProps {
  placeholder: string;
  field: string;
}

const ImageField = ({ placeholder, field }: IImageFieldProps) => {
  const { setFieldValue } = useFormikContext<EventForm>();
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

      <UploadFile
        onChange={(url: string) => {
          setFieldValue(field, url);
        }}
      />
      <ErrorMsg field={field} />
    </View>
  );
};

export default ImageField;
