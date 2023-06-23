// Native
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "./DatePicker";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
// Components
import { ProfileText } from "../components/ProfileText";
import { styles } from "../styles/profileScreenStyles";
import { setSelectedPlan } from "../state/selectedPlan";
import { API_URL } from "../services/urls";

export const ChangeEventData = ({ baseData, propName, keyboardType }) => {
  const plan = useSelector((state) => state.selectedPlan);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState(baseData);
  const [change, setChange] = useState(false);

  const createEditedPlan = (propName, newValue) => {
    let editedPlan = { ...plan };
    editedPlan[propName] = newValue;
    return editedPlan;
  };

  const handleChange = async (propName, newValue) => {
    if (change) {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          await axios.put(
            `${API_URL}/api/events/${plan._id}`,
            {
              [propName]: newValue,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(updateSelectedPlan({ key: propName, value: newValue }));
        }
      } catch (error) {
        Alert.alert(`Error: ${error}`);
      }
    }
    setChange(!change);
  };

  const formattedData =
    propName === "event_date" ? moment(newData).format("DD/MM/YYYY") : newData;

  return (
    <>
      {!change ? (
        <View style={styles.container3}>
          <ProfileText
            customStyle={styles.container3}
            customStyleText={styles.text3}
            text={formattedData}
          />
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={handleChange}
          >
            <EvilIcons name="pencil" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container3}>
          {keyboardType !== "date" ? (
            <View style={styles.containerChange}>
              <TextInput
                keyboardType={keyboardType}
                style={styles.text3}
                value={newData}
                onChangeText={setNewData}
              />
            </View>
          ) : (
            <DatePicker
              selectedDate={newData}
              onChange={(date) => setNewData(date.toISOString())}
            />
          )}
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={() => handleChange(propName, newData)}
          >
            <Feather name="check-square" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
