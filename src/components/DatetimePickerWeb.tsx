import { DatePicker, Space } from "antd";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";

interface IDatetimePickerProps {
  field: string;
  dateOnly?: boolean;
  readOnly?: boolean;
}

const DatetimePickerWeb = ({
  field,
  dateOnly,
  readOnly,
}: IDatetimePickerProps) => {
  const { setFieldValue } = useFormikContext<EventForm>();
  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime={!dateOnly}
        showSecond={false}
        onChange={(date) => {
          setFieldValue(field, date.toISOString());
        }}
        format={dateOnly ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm:ss"}
        readOnly={readOnly}
      />
    </Space>
  );
};

export default DatetimePickerWeb;
