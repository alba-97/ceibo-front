import { View } from "react-native";
import React, { useEffect, useState } from "react";
import GenericButton from "../GenericButton";
import { getCanEdit } from "../../services/getCanEdit";
import { useNavigation } from "@react-navigation/native";
import { deleteEvent } from "../../services/deleteEvent";
import { useDispatch } from "react-redux";

const PlanEdit = ({ plan }) => {
  const [canEdit, setCanEdit] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await deleteEvent(plan._id, dispatch);
    navigation.navigate("HomeScreen");
  };

  const fetchInfo = async () => {
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
