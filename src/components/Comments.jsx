import React, { useState } from "react";
import { Text, View } from "react-native";
import { GenericInput } from "./GenericInput";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../styles/PlanDetails";
import { addComment } from "../services/addComment";
import { GenericButton } from "./GenericButton";
import { setComments } from "../state/selectedPlan";

const Comments = () => {
  const plan = useSelector((state) => state.selectedPlan);
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = async () => {
    let newComment = await addComment(comment, plan._id);
    dispatch(setComments(newComment));
  };

  return (
    <View style={{ marginTop: "5%" }}>
      <Text style={styles.subtitle}>¡Agrega un comentario al evento!</Text>
      <View style={styles.input}>
        <GenericInput value={comment} onChangeText={setComment} />
        <GenericButton
          onPress={handleComment}
          text={"Enviar"}
          customStyle={{ marginTop: "5%" }}
        />
      </View>
      {plan.comments &&
        plan.comments.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.comment}>{item.text}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default Comments;
