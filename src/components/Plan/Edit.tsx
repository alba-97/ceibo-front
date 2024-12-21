import { View } from "react-native";
import { useEffect, useState } from "react";
import GenericButton from "../GenericButton";
import { getCanEdit } from "../../api/getCanEdit";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { deleteEvent } from "../../api/deleteEvent";
import { useDispatch } from "react-redux";
import { EventResponse } from "@/interfaces/responses/Event";
import { styles } from "@/styles/genericInputStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IPlanEditProps {
  plan: EventResponse;
}

const PlanEdit = ({ plan }: IPlanEditProps) => {
  const [canEdit, setCanEdit] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!plan._id) return;
    await deleteEvent(plan._id, dispatch);
    navigation.navigate("HomeScreen");
  };

  const fetchInfo = async () => {
    if (!plan._id) return;
    const canEdit = await getCanEdit(plan._id);
    setCanEdit(canEdit);
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
