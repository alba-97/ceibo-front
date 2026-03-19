import EventForm from "@/interfaces/forms/Event";
import IOption from "@/interfaces/Option";
import { useFormikContext } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ErrorMsg from "./ErrorMsg";

interface ISelectFieldProps {
  data: IOption[];
  field: string;
}

const SelectField = ({ data, field }: ISelectFieldProps) => {
  const { setFieldValue } = useFormikContext<EventForm>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(data[0]?.value ?? "");
  const initialized = useRef(false);
  const items = useMemo(
    () => data.map((d) => ({ label: d.label, value: d.value })),
    [data],
  );

  useEffect(() => {
    if (!initialized.current && data[0]?.value) {
      initialized.current = true;
      setValue(data[0].value);
      setFieldValue(field, data[0].value);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={(val) => val && setFieldValue(field, val)}
        style={styles.picker}
        dropDownContainerStyle={styles.dropdown}
        textStyle={styles.text}
        placeholderStyle={styles.placeholder}
        listItemLabelStyle={styles.text}
        selectedItemLabelStyle={styles.selectedText}
      />
      <ErrorMsg field={field} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 20,
    zIndex: 1000,
  },
  picker: {
    backgroundColor: "#1E1E1E",
    borderColor: "#3A3A3A",
    borderRadius: 8,
    minHeight: 48,
  },
  dropdown: {
    backgroundColor: "#1E1E1E",
    borderColor: "#3A3A3A",
    borderRadius: 8,
  },
  text: {
    color: "#F0F0F0",
    fontSize: 16,
  },
  placeholder: {
    color: "#999",
    fontSize: 16,
  },
  selectedText: {
    color: "#F0F0F0",
    fontWeight: "600",
  },
});

export default SelectField;
