import { useEffect, useMemo, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View } from "react-native";
import IOptionSelect from "@/interfaces/OptionSelect";

interface IMultipleDropdownProps {
  data: IOptionSelect[];
  selectedValues: string[];
  onSelect: (selectedItems: string[]) => void;
  placeholder?: string;
}

const MultipleDropdown = ({
  data,
  selectedValues,
  onSelect,
  placeholder = "Select items",
}: IMultipleDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(selectedValues);

  useEffect(() => {
    setValue(selectedValues);
  }, [selectedValues]);
  const items = useMemo(
    () => data.map((d) => ({ label: d.name, value: d.id })),
    [data],
  );

  return (
    <View style={styles.container}>
      <DropDownPicker
        multiple
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={(val) => val && onSelect(val as string[])}
        placeholder={placeholder}
        searchable
        extendableBadgeContainer
        searchTextInputProps={{
          style: {
            color: "#F0F0F0",
            borderWidth: 1,
            borderColor: "#3A3A3A",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 6,
            backgroundColor: "#1E1E1E",
          },
        }}
        mode="BADGE"
        badgeColors={["#2D2D2D"]}
        badgeDotColors={["#aaa"]}
        style={styles.picker}
        dropDownContainerStyle={styles.dropdown}
        textStyle={styles.text}
        placeholderStyle={styles.placeholder}
        badgeStyle={styles.badge}
        badgeTextStyle={styles.badgeText}
        listItemLabelStyle={styles.text}
        selectedItemLabelStyle={styles.selectedText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "25%",
    marginBottom: 10,
    marginTop: 10,
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
    fontSize: 15,
  },
  placeholder: {
    color: "#999",
    fontSize: 15,
  },
  badge: {
    backgroundColor: "#2D2D2D",
    borderColor: "#3A3A3A",
    borderWidth: 1,
    borderRadius: 6,
  },
  badgeText: {
    color: "#F0F0F0",
  },
  selectedText: {
    color: "#F0F0F0",
    fontWeight: "600",
  },
});

export default MultipleDropdown;
