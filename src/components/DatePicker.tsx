import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TextInput } from "react-native";
import { styles } from "../styles/datePickerStyles";
import { useState } from "react";

interface IDatePickerProps {
  selectedDate: string;
  value?: Date;
  onChange: (date: Date) => void;
}

export const DatePicker = ({ value, onChange }: IDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [showPicker, setShowPicker] = useState(false);
  const [_, setIsEditing] = useState(false);

  const handleDateChange = (_: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onChange(date);
    }
  };

  const showDateTimePicker = () => {
    if (!showPicker) {
      setShowPicker(true);
      setIsEditing(true);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <TextInput
        style={styles.input}
        value={selectedDate ? formatDate(selectedDate) : ""}
        onFocus={showDateTimePicker}
        onBlur={() => setIsEditing(false)}
        editable={!showPicker}
      />

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </>
  );
};
