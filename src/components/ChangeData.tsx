import {
  Alert,
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { ProfileText } from "../components/ProfileText";
import { updateUser } from "../state/user";
import { updateSelectedPlan } from "../state/selectedPlan";
import { API_URL } from "@env";
import { styles as editPlanStyles } from "../styles/editPlanStyles";
import { styles as profileScreenStyles } from "../styles/profileScreenStyles";
import { RootState } from "@/state/store";

interface IChangeData {
  mode: string;
  data: string;
  baseData?: string | number;
  propName: string;
  keyboardType: KeyboardTypeOptions;
  styles: typeof editPlanStyles | typeof profileScreenStyles;
}

export const ChangeData = ({
  mode,
  data,
  baseData,
  propName,
  keyboardType,
  styles,
}: IChangeData) => {
  if (typeof baseData !== "string") baseData = String(baseData);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState(baseData);
  const [change, setChange] = useState(false);
  const plan = useSelector((state: RootState) => state.selectedPlan);

  const handleChange = async (propName: string, newValue: string) => {
    if (change) {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          if (mode == "user") {
            await axios.put(
              `${API_URL}/users/`,
              {
                [propName]: newValue,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            dispatch(updateUser({ [propName]: newValue }));
          } else if (mode == "event") {
            await axios.put(
              `${API_URL}/events/${plan._id}`,
              {
                [propName]: newValue,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            dispatch(
              updateSelectedPlan({
                [propName]: newValue,
              })
            );
          }
        }
      } catch (error) {
        if (error instanceof AxiosError)
          Alert.alert("Error", error.response?.data);
      }
    }
    setChange(!change);
  };
  let date = mode == "user" ? "birthdate" : "start_date";
  const formattedData =
    propName === date ? moment(newData).format("DD/MM/YYYY") : newData;

  return (
    <>
      {!change ? (
        <View style={styles.container3}>
          <View style={styles.dataUserContainer}>
            <Text style={styles.textData}>{data}:</Text>
          </View>
          <ProfileText
            customStyle={styles.container3}
            customStyleText={styles.text3}
            text={formattedData}
          />
          <TouchableOpacity
            style={styles.pencilIconContainer}
            onPress={() => handleChange(propName, newData)}
          >
            <EvilIcons name="pencil" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container3}>
          {keyboardType !== ("date" as KeyboardTypeOptions) ? (
            <View style={styles.containerChange}>
              <View style={styles.dataUserContainer2}>
                <Text style={styles.textData}>{data}:</Text>
              </View>

              <TextInput
                style={styles.text3}
                keyboardType={keyboardType}
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
