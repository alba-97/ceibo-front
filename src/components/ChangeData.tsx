import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { T } from "@/theme";
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
        <View style={styles.valueContainer}>
          {change ? (
            <DatetimePicker field={field} dateOnly />
          ) : (
            <Text style={styles.text}>{getDateOnly(value)}</Text>
          )}
        </View>
      ) : (
        <View style={styles.valueContainer}>
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
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  valueContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  data: {
    color: "#FFF",
    fontSize: 13,
  },
  text: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "right",
  },
  input: {
    color: "#F0F0F0",
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3A3A3A",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
