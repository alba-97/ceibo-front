import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import handleError from "@/utils/handleError";
import { useFormikContext } from "formik";
import UserForm from "@/interfaces/forms/User";
import DatetimePicker from "./DatetimePicker";
import getDateOnly from "@/utils/getDateOnly";
import editUser from "@/api/editUser";
import { useDispatch } from "react-redux";
import { updateUser } from "@/state/user";
import { toast } from "react-toastify";

interface IChangeData {
  placeholder: string;
  field: string;
  type?: string;
}

export const ChangeData = ({
  placeholder,
  field,
  type = "text",
}: IChangeData) => {
  const [change, setChange] = useState<boolean>(false);
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<UserForm>();
  const dispatch = useDispatch();

  const value = values[field as keyof UserForm];

  const handleEdit = async () => {
    try {
      const error = errors[field as keyof UserForm];
      if (error) {
        if (error) toast.error(error);
        return;
      }

      await editUser({ [field]: value });
      dispatch(updateUser({ [field]: value }));

      setChange(!change);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.data}>{placeholder}:</Text>
      </View>
      {type === "date" ? (
        <View>
          {change ? (
            <DatetimePicker field={field} dateOnly />
          ) : (
            <Text style={styles.text}>{getDateOnly(value)}</Text>
          )}
        </View>
      ) : (
        <View>
          {change ? (
            <TextInput
              onChangeText={handleChange(field)}
              onBlur={handleBlur(field)}
              value={value}
              style={styles.input}
            />
          ) : (
            <Text style={styles.text}>
              {!!value ? value : "(Not specified)"}
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity onPress={handleEdit}>
        {!change ? (
          <EvilIcons name="pencil" size={30} color="white" />
        ) : (
          <Feather name="check-square" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
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
  input: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#22001b",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
