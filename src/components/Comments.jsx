import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GenericInput } from "./GenericInput";
import { useSelector } from "react-redux";
import { styles } from "../styles/PlanDetails";
import { addComment } from "../services/addComment";
import { GenericButton } from "./GenericButton";

const Comments = () => {
  const plan = useSelector((state) => state.selectedPlan);
  console.log("plan comments", plan);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    await addComment(comment, plan._id);
  };

  return (
    <View>
      <View style={styles.input}>
        <GenericInput value={comment} onChangeText={setComment} />
        <TouchableOpacity style={styles.addButton} onPress={handleComment}>
          <GenericButton text={"Enviar"} customStyle={{ marginTop: "5%" }} />
        </TouchableOpacity>
      </View>
      {plan.comments &&
        plan.comments.map((item, index) => {
          console.log("comment", item);
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
