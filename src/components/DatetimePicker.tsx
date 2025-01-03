import DatetimePickerMobile from "./DatetimePickerMobile";
import DatetimePickerWeb from "./DatetimePickerWeb";
import { Platform } from "react-native";

interface IDatetimePickerProps {
  field: string;
}

const DatetimePicker = ({ field }: IDatetimePickerProps) => {
  if (Platform.OS !== "web") return <DatetimePickerMobile field={field} />;
  else return <DatetimePickerWeb field={field} />;
};

export default DatetimePicker;
