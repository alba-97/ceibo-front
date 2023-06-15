import React, { useState } from "react";
import { Text, View } from "react-native";
import { GenericInput } from "./GenericInput";
import { useSelector } from "react-redux";
import { styles } from "../styles/PlanDetails";
import { addComment } from "../services/addComment";
import { GenericButton } from "./GenericButton";

const Comments = () => {
  const plan = useSelector((state) => state.selectedPlan);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    await addComment(comment, plan._id);
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
