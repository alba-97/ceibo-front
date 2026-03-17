import { View } from "react-native";
import GenericButton from "@/components/GenericButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import deleteEvent from "@/api/deleteEvent";
import { useDispatch, useSelector } from "react-redux";
import EventResponse from "@/interfaces/responses/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import { removeEventFromUser } from "@/state/user";
import { removeEvent } from "@/state/events";
import { RootState } from "@/state/store";

interface IEventEditProps {
  event: EventResponse;
}

export default ({ event }: IEventEditProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const isOwner = !!user._id && user._id === event.createdBy._id;

  const handleDelete = async () => {
    if (!event._id) return;
    try {
      await deleteEvent(event._id);
      dispatch(removeEventFromUser(event._id));
      dispatch(removeEvent(event._id));
      navigation.navigate("home");
    } catch (err) {
      handleError(err);
    }
  };

  if (!isOwner) return null;

  return (
    <View style={{ gap: 10, marginVertical: 10 }}>
      <GenericButton
        text="Editar evento"
        onPress={() => navigation.navigate("edit-event")}
      />
      <GenericButton text="Borrar evento" onPress={handleDelete} />
    </View>
  );
};
