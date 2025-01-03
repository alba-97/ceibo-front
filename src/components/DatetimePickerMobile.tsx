import EventForm from "@/interfaces/forms/Event";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import { Button } from "react-native";
import GenericButton from "./GenericButton";

interface IDatetimePickerProps {
  field: string;
}

const DatetimePickerMobile = ({ field }: IDatetimePickerProps) => {
  const { values, setFieldValue } = useFormikContext<EventForm>();
  const date = values[field as keyof EventForm] as string;
  return (
    <GenericButton
      text={date.slice(0, 16).replace("T", " ")}
      onPress={() => {
        DateTimePickerAndroid.open({
          value: new Date(),
          onChange: (_, selectedDate) => {
            DateTimePickerAndroid.open({
              mode: "time",
              value: new Date(),
              onChange: (_, selectedDate2) => {
                if (!selectedDate || !selectedDate2) return;
                const date = selectedDate.toISOString().split("T")[0];
                const time = selectedDate2.toISOString().split("T")[1];
                setFieldValue(field, `${date}T${time}`);
              },
            });
          },
        });
      }}
    />
  );
};

export default DatetimePickerMobile;
