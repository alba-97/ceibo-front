import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StyleSheet, TextInput, ViewStyle } from "react-native";
import { useState } from "react";

interface IDatePickerProps {
  selectedDate?: string;
  value?: Date | string;
  customStyle?: ViewStyle;
  type?: string;
  placeholder?: string;
  onChange: (date: Date | string) => void;
}

export const DatePicker = ({ value, onChange }: IDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(
    typeof value === "string" ? new Date(value) : value
  );
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

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#22001b",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
  },
});
