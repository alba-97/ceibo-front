import IOption from "@/interfaces/Option";
import { useState } from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";

interface IRadioButtonProps {
  options: IOption[];
  onSelect: (option: IOption) => void;
  style?: ViewStyle;
}

const RadioButton = ({ options, onSelect, style = {} }: IRadioButtonProps) => {
  const [selectedOption, setSelectedOption] = useState<IOption>();

  const handleOptionSelect = (option: IOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={{ ...style, flexDirection: "row", marginVertical: 10 }}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleOptionSelect(option)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor:
                selectedOption?.value === option.value ? "white" : "gray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedOption?.value === option.value && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "white",
                }}
              />
            )}
          </View>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginVertical: 5,
              marginLeft: 5,
              marginRight: 10,
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
