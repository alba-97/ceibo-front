import EventForm from "@/interfaces/forms/Event";
import IOption from "@/interfaces/Option";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import ChevronImg from "../assets/images/chevron.png";
import ErrorMsg from "./ErrorMsg";

interface ISelectFieldProps {
  data: IOption[];
  field: string;
}

const SelectField = ({ data, field }: ISelectFieldProps) => {
  const { setFieldValue } = useFormikContext<EventForm>();
  const [option, setOption] = useState<IOption>(data[0]);

  useEffect(() => {
    setOption(data[0]);
    data[0]?.value && setFieldValue(field, data[0].value);
  }, [data]);

  return (
    <View>
      {option && (
        <ModalSelector
          data={data}
          scrollViewPassThruProps={{
            showsVerticalScrollIndicator: false,
          }}
          onChange={(option: IOption) => {
            setFieldValue(field, option.value);
            setOption(option);
          }}
          overlayStyle={{ backgroundColor: "transparent" }}
          optionContainerStyle={{
            backgroundColor: "#691359",
            borderWidth: 8,
            borderRadius: 4,
            borderColor: "#59104c",
          }}
          optionTextStyle={{
            fontWeight: "bold",
            color: "white",
          }}
          cancelStyle={{
            backgroundColor: "#781365",
          }}
          cancelTextStyle={{
            fontWeight: "bold",
            color: "white",
          }}
          cancelText="Cancelar"
        >
          <Text
            style={{
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: "rgba(225, 200, 200, 0.3)",
              borderColor: "rgba(10, 7, 7, 0.2)",
              fontWeight: "bold",
              color: "white",
              fontSize: 18,
            }}
          >
            {option.label}
            <Image
              source={ChevronImg}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </Text>
        </ModalSelector>
      )}
      <ErrorMsg field={field} />
    </View>
  );
};

export default SelectField;
