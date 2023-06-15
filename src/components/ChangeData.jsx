import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileText } from "../components/ProfileText";
import { styles } from "../styles/profileScreenStyles";
import axios from "axios";
import { API_URL, PORT } from "@env";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { setUser } from "../state/user";
import { DatePicker } from "./DatePicker";

const ChangeData = ({ baseData, propName, type, keyboardType }) => {
  console.log("type", typeof baseData);
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

        if (type === "date"){ 
 
          newValue = newData.toISOString();}
          console.log('newVlue desp', newValue);

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

          dispatch(setUser(createEditedUser(propName, newValue)));
        }
      } catch (error) {
        Alert.alert("Error", `este es el error del handlechange ${error}`);
      }
    }
    setChange(!change);
  };

  return (
    <>
      {!change ? (
        <View style={styles.container3}>
          <ProfileText
            customStyle={styles.container3}
            customStyleText={styles.text3}
            text={baseData} //user.username
          />
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={handleChange}
          >
            <EvilIcons name="pencil" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ) : type === "date" ? (
        <View style={styles.container3}>
          <View style={styles.containerChange}>
            <DatePicker
              type="date"
              value={newData}
              onChange={(date) => setNewData(new Date(date))}
            />
          </View>
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={() => handleChange(propName, newData)}
          >
            <Feather name="check-square" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container3}>
          <View style={styles.containerChange}>
            <TextInput
              keyboardType={keyboardType}
              type={type}
              value={newData}
              style={styles.text3}
              onChangeText={setNewData}
            />
          </View>
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

export default ChangeData;
