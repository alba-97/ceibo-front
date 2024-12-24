import { View } from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "../GenericButton";
import getEditableEvents from "@/api/getEditableEvents";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import deleteEvent from "@/api/deleteEvent";
import { useDispatch } from "react-redux";
import EventResponse from "@/interfaces/responses/Event";
import { styles } from "@/styles/genericInputStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import { removePlanFromUser } from "@/state/user";
import { removePlan } from "@/state/plans";

interface IPlanEditProps {
  plan: EventResponse;
}

const PlanEdit = ({ plan }: IPlanEditProps) => {
  const [canEdit, setCanEdit] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!plan._id) return;
    try {
      await deleteEvent(plan._id);
      dispatch(removePlanFromUser(plan._id));
      dispatch(removePlan(plan._id));
      navigation.navigate("HomeScreen");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchInfo = async () => {
    if (!plan._id) return;
    try {
      const canEdit = await getEditableEvents(plan._id);
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
                navigation.navigate("EditPlan");
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

export default PlanEdit;
