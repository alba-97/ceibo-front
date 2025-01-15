import { DatePicker, Space } from "antd";
import { useFormikContext } from "formik";
import EventForm from "@/interfaces/forms/Event";

interface IDatetimePickerProps {
  field: string;
}

const DatetimePickerWeb = ({ field }: IDatetimePickerProps) => {
  const { setFieldValue } = useFormikContext<EventForm>();
  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime
        showSecond={false}
        onChange={(date) => {
          setFieldValue(field, date.toDate());
        }}
        format={"DD/MM/YYYY HH:mm:ss"}
      />
    </Space>
  );
};

export default DatetimePickerWeb;
