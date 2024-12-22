import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import moment from "moment";
import { ProfileText } from "../components/ProfileText";
import { updateUser } from "../state/user";
import { updateSelectedPlan } from "../state/selectedPlan";
import { styles as editPlanStyles } from "../styles/editPlanStyles";
import { styles as profileScreenStyles } from "../styles/profileScreenStyles";
import editUser from "@/api/editUser";
import editEvent from "@/api/editEvent";
import handleError from "@/utils/handleError";

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
  const [change, setChange] = useState<boolean>(false);

  const handleChange = async (propName: string, newValue: string) => {
    try {
      setChange(!change);
      if (!change) return;
      const data = { [propName]: newValue };
      switch (mode) {
        case "user":
          await editUser(data);
          dispatch(updateUser(data));
          break;
        case "event":
          await editEvent(data);
          dispatch(updateSelectedPlan(data));
          break;
      }
    } catch (err) {
      handleError(err);
    }
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
