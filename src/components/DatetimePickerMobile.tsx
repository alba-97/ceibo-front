import EventForm from "@/interfaces/forms/Event";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import GenericButton from "./GenericButton";
import { useFormikContext } from "formik";

interface IDatetimePickerProps {
  field: string;
}

const DatetimePickerMobile = ({ field }: IDatetimePickerProps) => {
  const { values, setFieldValue } = useFormikContext<EventForm>();
  const date = values[field as keyof EventForm] as string;

  const selectDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    DateTimePickerAndroid.open({
      mode: "time",
      value: new Date(),
      onChange: (_: DateTimePickerEvent, selectedDate2?: Date) => {
        if (!selectedDate || !selectedDate2) return;
        const date = selectedDate.toISOString().split("T")[0];
        const time = selectedDate2.toISOString().split("T")[1];
        setFieldValue(field, new Date(`${date}T${time}`));
      },
    });
  };

  return (
    <GenericButton
      text={date.slice(0, 16).replace("T", " ")}
      onPress={() => {
        DateTimePickerAndroid.open({
          value: new Date(),
          onChange: selectDate,
        });
      }}
    />
  );
};

export default DatetimePickerMobile;
