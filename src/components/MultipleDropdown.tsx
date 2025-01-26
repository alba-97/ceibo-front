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
    <View style={styles.container}>
      <MultiSelect
        hideTags
        items={data}
        uniqueKey="id"
        onSelectedItemsChange={onSelect}
        selectedItems={selectedValues}
        selectText="Pick Items"
        searchInputPlaceholderText={placeholder}
        tagRemoveIconColor="white"
        tagTextColor="white"
        selectedItemTextColor="white"
        selectedItemIconColor="white"
        itemTextColor="white"
        displayKey="name"
        submitButtonColor="#22001b"
        submitButtonText="Submit"
        searchInputStyle={styles.search}
        styleInputGroup={styles.inputGroup}
        styleDropdownMenu={styles.dropdownMenu}
        styleMainWrapper={styles.mainWrapper}
        styleListContainer={styles.bg}
        styleRowList={styles.bg}
        styleSelectorContainer={styles.selectorContainer}
        styleDropdownMenuSubsection={styles.dropdownMenuSubsection}
        styleTextDropdown={styles.text}
        styleTextDropdownSelected={styles.text}
        styleIndicator={styles.indicator}
        styleItemsContainer={styles.bg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 10 },
  hidden: {
    display: "none",
  },
  dropdownMenu: {
    height: "100%",
  },
  dropdownMenuSubsection: {
    backgroundColor: "#22001b",
    borderWidth: 1,
    borderColor: "#22001b",
  },
  search: {
    color: "white",
    backgroundColor: "#22001b",
    paddingLeft: 5,
    marginBottom: 5,
  },
  indicator: {
    backgroundColor: "#22001b",
    color: "white",
  },
  selectorContainer: {
    paddingTop: 10,
    paddingRight: 10,
  },
  mainWrapper: {
    backgroundColor: "#22001b",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#22001b",
    paddingLeft: 20,
  },
  inputGroup: {
    backgroundColor: "#22001b",
    color: "white",
  },
  bg: {
    backgroundColor: "#22001b",
  },
  text: {
    color: "white",
  },
});

export default MultipleDropdown;
