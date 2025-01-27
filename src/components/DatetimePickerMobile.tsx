import EventForm from "@/interfaces/forms/Event";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import GenericButton from "./GenericButton";
import { useFormikContext } from "formik";

interface IDatetimePickerProps {
  field: string;
  readOnly?: boolean;
}

const DatetimePickerMobile = ({ field, readOnly }: IDatetimePickerProps) => {
  const { values, setFieldValue } = useFormikContext<EventForm>();
  const date = values[field as keyof EventForm] as string;
  const formattedDate = date.slice(0, 16).replace("T", " ");

  const selectDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    DateTimePickerAndroid.open({
      mode: "time",
      value: new Date(),
      onChange: (_: DateTimePickerEvent, selectedDate2?: Date) => {
        if (!selectedDate || !selectedDate2) return;
        const date = selectedDate.toISOString().split("T")[0];
        const time = selectedDate2.toISOString().split("T")[1];
        setFieldValue(field, `${date}T${time}`);
      },
    });
  };

  return (
    <GenericButton
      text={formattedDate || "Select date"}
      onPress={() => {
        !readOnly &&
          DateTimePickerAndroid.open({
            value: new Date(),
            onChange: selectDate,
          });
      }}
    />
  );
};

export default DatetimePickerMobile;
