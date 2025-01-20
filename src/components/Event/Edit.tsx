import { View } from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "@/components/GenericButton";
import getEditableEvents from "@/api/getEditableEvents";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import deleteEvent from "@/api/deleteEvent";
import { useDispatch } from "react-redux";
import EventResponse from "@/interfaces/responses/Event";
import { styles } from "@/styles/genericInputStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import { removeEventFromUser } from "@/state/user";
import { removeEvent } from "@/state/events";

interface IEventEditProps {
  event: EventResponse;
}

const EventEdit = ({ event }: IEventEditProps) => {
  const [canEdit, setCanEdit] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!event._id) return;
    try {
      await deleteEvent(event._id);
      dispatch(removeEventFromUser(event._id));
      dispatch(removeEvent(event._id));
      navigation.navigate("HomeScreen");
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

export default EventEdit;
