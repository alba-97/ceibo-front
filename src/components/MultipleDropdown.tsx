import { useState } from "react";
import MultiSelect from "react-native-multiple-select";

import { StyleSheet, View } from "react-native";
import IOptionSelect from "@/interfaces/OptionSelect";

interface IMultipleDropdownProps {
  data: IOptionSelect[];
  selectedValues: IOptionSelect[];
  onSelect: (selectedItems: IOptionSelect[]) => void;
  placeholder?: string;
}

const MultipleDropdown = ({
  data,
  selectedValues,
  onSelect,
  placeholder,
}: IMultipleDropdownProps) => {
  const [_firstRender, _setFirstRender] = useState<boolean>(true);
  return (
    <View style={{ flex: 1 }}>
      <MultiSelect
        hideTags
        items={data}
        uniqueKey="id"
        onSelectedItemsChange={onSelect}
        selectedItems={selectedValues}
        selectText="Pick Items"
        searchInputPlaceholderText={placeholder}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#fff"
        tagTextColor="#fff"
        selectedItemTextColor="#FFF"
        selectedItemIconColor="#FFF"
        itemTextColor="#FFF"
        displayKey="name"
        submitButtonColor="#22001b"
        submitButtonText="Submit"
        searchInputStyle={{ ...styles.bg, ...styles.text }}
        styleSelectorContainer={styles.bg}
        styleDropdownMenu={styles.bg}
        styleItemsContainer={styles.bg}
        styleMainWrapper={styles.bg}
        styleInputGroup={styles.bg}
        styleDropdownMenuSubsection={styles.bg}
        styleTextDropdown={styles.text}
        styleTextDropdownSelected={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#22001b",
  },
  text: {
    color: "#fff",
  },
});

export default MultipleDropdown;
