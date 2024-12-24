import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button } from "react-native";

interface IDatetimePickerProps {
  date: string;
  onChange: (date: string) => void;
}

const DatetimePicker = ({ date, onChange }: IDatetimePickerProps) => {
  return (
    <Button
      title={date.slice(0, 16).replace("T", " ")}
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
                onChange(`${date}T${time}`);
              },
            });
          },
        });
      }}
    />
  );
};

export default DatetimePicker;
