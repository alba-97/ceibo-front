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
import { setUser } from "../state/user";
import { API_URL, PORT } from "@env";

export const ChangeData = ({ baseData, propName, keyboardType }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState(baseData);
  const [change, setChange] = useState(false);

  const createEditedUser = (propName, newValue) => {
    let editedUser = { ...user };
    editedUser[propName] = newValue;
    return editedUser;
  };

  const handleChange = async (propName, newValue) => {
    if (change) {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const res = await axios.put(
            `${API_URL}:${PORT}/api/users/`,
            {
              [propName]: newValue,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const newUser = await res.data;
          dispatch(setUser(createEditedUser(propName, newValue)));
        }
      } catch (error) {
        Alert.alert(`Error: ${error}`);
      }
    }
    setChange(!change);
  };

  const formattedData =
    propName === "birthdate" ? moment(newData).format("DD/MM/YYYY") : newData;

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
