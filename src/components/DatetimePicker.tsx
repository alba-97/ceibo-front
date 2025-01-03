import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import datetimePickerStyles from "@/styles/datetimePicker";
import dayjs from "dayjs";

interface IDatetimePickerProps {
  date: string;
  onChange: (date: string) => void;
}

const DatetimePicker = ({ date, onChange }: IDatetimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        value={dayjs(date)}
        onChange={(newDate) => onChange(newDate?.toISOString() ?? "")}
        sx={datetimePickerStyles}
      />
    </LocalizationProvider>
  );
};

export default DatetimePicker;
