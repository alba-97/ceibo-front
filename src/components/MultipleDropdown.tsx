import { useState, useEffect, useRef } from "react";

import SearchImg from "../assets/images/search.png";
import CloseImg from "../assets/images/close.png";
import ChevronImg from "../assets/images/chevron.png";
import CheckImg from "../assets/images/check.png";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  ViewStyle,
  TextStyle,
} from "react-native";
import IOption from "@/interfaces/Option";

interface IMultipleDropdownProps {
  fontFamily?: string;
  setSelected: (value: IOption[]) => void;
  placeholder: string;
  boxStyles: ViewStyle;
  dropdownStyles: ViewStyle;
  dropdownItemStyles?: ViewStyle;
  maxHeight?: number;
  data: IOption[];
  searchicon?: boolean;
  arrowicon?: boolean;
  closeicon?: boolean;
  search?: boolean;
  searchPlaceholder?: string;
  onSelect?: (value?: IOption) => void;
  label?: string;
  notFoundText?: string;
  disabledItemStyles?: ViewStyle;
  textStyles?: TextStyle;
  badgeStyles?: TextStyle;
  save?: string;
  dropdownShown?: boolean;
}

const MultipleDropdown = ({
  fontFamily,
  setSelected,
  placeholder,
  boxStyles,
  dropdownStyles,
  dropdownItemStyles,
  maxHeight,
  data,
  searchicon = false,
  arrowicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = "search",
  onSelect = () => {},
  label,
  notFoundText = "No se encontraron datos",
  disabledItemStyles,
  textStyles,
  save = "key",
  dropdownShown = false,
}: IMultipleDropdownProps) => {
  const [_firstRender, _setFirstRender] = useState(true);
  const [dropdown, setDropdown] = useState(dropdownShown);
  const [selectedvalues, setSelectedValues] = useState<IOption[]>([]);
  const [height, setHeight] = useState(350);
  const animatedvalue = useRef(new Animated.Value(0)).current;
  const [filtereddata, setFilteredData] = useState(data);

  const slidedown = () => {
    setDropdown(true);

    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect();
  }, [selectedvalues]);

  useEffect(() => {
    if (!_firstRender) {
      if (dropdownShown) slidedown();
      else slideup();
    }
  }, [dropdownShown]);

  return (
    <View>
      {dropdown && search ? (
        <View style={[styles.wrapper, boxStyles]}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {!searchicon ? (
              <Image
                source={SearchImg}
                resizeMode="contain"
                style={{ width: 20, height: 20, marginRight: 7 }}
              />
            ) : (
              searchicon
            )}

            <TextInput
              placeholder={searchPlaceholder}
              onChangeText={(val) => {
                let result = data.filter((item) => {
                  val.toLowerCase();
                  let row = item.value.toLowerCase();
                  return row.search(val.toLowerCase()) > -1;
                });
                setFilteredData(result);
              }}
              style={[
                { padding: 0, height: 20, flex: 1, fontFamily },
                textStyles,
              ]}
            />
            <TouchableOpacity
              onPress={() => {
                slideup();
              }}
            >
              {!closeicon ? (
                <Image
                  source={CloseImg}
                  resizeMode="contain"
                  style={{ width: 17, height: 17 }}
                />
              ) : (
                closeicon
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : selectedvalues?.length > 0 ? (
        <TouchableOpacity
          style={[styles.wrapper, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <View>
            <Text style={[{ fontWeight: "600", fontFamily }, textStyles]}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.wrapper, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <Text style={[{ fontFamily }, textStyles]}>
            {selectedvalues[0].value == ""
              ? placeholder ?? "Select option"
              : selectedvalues[0].value}
          </Text>
          {!arrowicon ? (
            <Image
              source={ChevronImg}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          ) : (
            arrowicon
          )}
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View
          style={[
            { maxHeight: animatedvalue },
            styles.dropdown,
            dropdownStyles,
          ]}
        >
          <View style={[{ maxHeight: height }]}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 10 }}
              nestedScrollEnabled={true}
            >
              {filtereddata.length >= 1 ? (
                filtereddata.map((item, index) => {
                  let key = item.key ?? item.value ?? item;
                  let value = item.label ?? item.value ?? item;
                  let disabled = item.disabled ?? false;
                  if (disabled) {
                    return (
                      <TouchableOpacity
                        style={[styles.disabledoption, disabledItemStyles]}
                        key={index}
                      >
                        <View
                          style={[
                            {
                              width: 15,
                              height: 15,
                              marginRight: 10,
                              borderRadius: 3,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#c4c5c6",
                            },
                            textStyles,
                          ]}
                        >
                          {selectedvalues?.find(
                            (item: IOption) => value === item.value
                          ) ? (
                            <Image
                              key={index}
                              source={CheckImg}
                              resizeMode="contain"
                              style={[{ width: 8, height: 8, paddingLeft: 7 }]}
                            />
                          ) : null}
                        </View>
                        <Text
                          style={[{ fontFamily, color: "#c4c5c6" }, textStyles]}
                        >
                          {value}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={[styles.option, dropdownItemStyles]}
                        key={index}
                        onPress={() => {
                          const existing = selectedvalues?.findIndex(
                            (item: IOption) => value === item.value
                          );

                          if (existing != -1 && existing != undefined) {
                            let sv = [...selectedvalues];
                            sv.splice(existing, 1);
                            setSelectedValues(sv);
                            setSelected(sv);
                          } else {
                            if (save === "value") {
                              setSelected([{ value, label: value }]);
                            } else {
                              setSelected([{ value: key, label: key }]);
                            }

                            setSelectedValues((val) => {
                              let temp = [
                                ...new Set([
                                  ...val,
                                  { value, label: value } as IOption,
                                ]),
                              ];
                              return temp;
                            });
                          }
                        }}
                      >
                        <View
                          style={[
                            {
                              width: 15,
                              height: 15,
                              borderWidth: 1,
                              marginRight: 10,
                              borderColor: "white",
                              borderRadius: 3,
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            textStyles,
                          ]}
                        >
                          {selectedvalues?.find(
                            (item: IOption) => value === item.value
                          ) ? (
                            <Image
                              key={index}
                              source={CheckImg}
                              resizeMode="contain"
                              style={{ width: 8, height: 8, paddingLeft: 7 }}
                            />
                          ) : null}
                        </View>
                        <Text style={[{ fontFamily }, textStyles]}>
                          {value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <TouchableOpacity
                  style={[styles.option, dropdownItemStyles]}
                  onPress={() => {
                    setSelected([{ value: "", label: "" }]);
                    setSelectedValues([]);
                    slideup();
                    setTimeout(() => setFilteredData(data), 800);
                  }}
                >
                  <Text style={textStyles}>{notFoundText}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default MultipleDropdown;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(10, 7, 7, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(10, 7, 7, 0.2)",
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
});
