import DatetimePickerMobile from "./DatetimePickerMobile";
import DatetimePickerWeb from "./DatetimePickerWeb";
import { Platform } from "react-native";

interface IDatetimePickerProps {
  field: string;
  dateOnly?: boolean;
  readOnly?: boolean;
}

const DatetimePicker = ({ field, ...props }: IDatetimePickerProps) => {
  if (Platform.OS !== "web")
    return <DatetimePickerMobile field={field} {...props} />;
  else return <DatetimePickerWeb field={field} {...props} />;
};

export default DatetimePicker;
