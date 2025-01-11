import {
  KeyboardTypeOptions,
  StyleSheet,
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
import { updateUser } from "../state/user";
import { updateSelectedPlan } from "../state/selectedPlan";
import editUser from "@/api/editUser";
import editEvent from "@/api/editEvent";
import handleError from "@/utils/handleError";

interface IChangeData {
  mode: string;
  data: string;
  baseData?: string | number;
  propName: string;
  keyboardType: KeyboardTypeOptions;
}

export const ChangeData = ({
  mode,
  data,
  baseData,
  propName,
  keyboardType,
}: IChangeData) => {
  if (!baseData) baseData = "(Not specified)";
  if (typeof baseData !== "string") baseData = `${baseData}`;
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
        <View style={styles.container}>
          <View>
            <Text style={styles.data}>{data}:</Text>
          </View>
          <Text style={styles.text}>{formattedData}</Text>
          <TouchableOpacity onPress={() => handleChange(propName, newData)}>
            <EvilIcons name="pencil" size={30} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          {keyboardType !== ("date" as KeyboardTypeOptions) ? (
            <View>
              <Text style={styles.data}>{data}:</Text>

              <TextInput
                style={styles.text}
                keyboardType={keyboardType}
                value={newData}
                onChangeText={setNewData}
              />
            </View>
          ) : (
            <DatePicker
              selectedDate={newData}
              onChange={(date) => {
                if (typeof date === "string") setNewData(date);
                else setNewData(date.toISOString());
              }}
            />
          )}
          <TouchableOpacity onPress={() => handleChange(propName, newData)}>
            <Feather name="check-square" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  data: {
    color: "#FFF",
    fontSize: 13,
    textAlign: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
