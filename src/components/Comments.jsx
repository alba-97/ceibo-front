import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GenericInput } from "./GenericInput";
import { useSelector } from "react-redux";
import { styles } from "../styles/PlanDetails";
import { addComment } from "../services/addComment";

const Comments = () => {
  const plan = useSelector((state) => state.selectedPlan);

  const [comment, setComment] = useState("");

  const handleComment = async () => {
    await addComment(comment, plan._id);
  };

  return (
    <View>
      <View style={styles.input}>
        <GenericInput value={comment} onChangeText={setComment} />
        <TouchableOpacity style={styles.addButton} onPress={handleComment}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
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
