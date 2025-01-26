import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "@/components/GenericButton";
import getEditableEvents from "@/api/getEditableEvents";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import deleteEvent from "@/api/deleteEvent";
import { useDispatch } from "react-redux";
import EventResponse from "@/interfaces/responses/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import { removeEventFromUser } from "@/state/user";
import { removeEvent } from "@/state/events";

interface IEventEditProps {
  event: EventResponse;
}

export default ({ event }: IEventEditProps) => {
  const [canEdit, setCanEdit] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!event._id) return;
    try {
      await deleteEvent(event._id);
      dispatch(removeEventFromUser(event._id));
      dispatch(removeEvent(event._id));
      navigation.navigate("Home");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchInfo = async () => {
    if (!event._id) return;
    try {
      const canEdit = await getEditableEvents(event._id);
      setCanEdit(canEdit);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  });

  return (
    <View>
      {canEdit && (
        <View>
          <View style={styles.input}>
            <GenericButton
              text={"Editar evento"}
              onPress={() => {
                navigation.navigate("EditEvent");
              }}
            />
          </View>
          <View style={styles.input}>
            <GenericButton text={"Borrar evento"} onPress={handleDelete} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#22001b",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
  },
});
