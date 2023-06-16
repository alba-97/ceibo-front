import React, { useState } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
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
    <View style={{ marginTop: "0%" }}>
      <Text style={styles.subtitle}>Comentarios:</Text>
      <ScrollView
        style={{
          height: 280,
          borderColor: "#000",
          borderWidth: 1,
          margin: 5,
          padding: 15,
        }}
      >
        {plan.comments &&
          plan.comments.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.username}>{item.user.username}:</Text>
                <Text style={styles.comment}>{item.text}</Text>
              </View>
            );
          })}
        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>
      <View style={styles.inputCont} behavior="padding">
        <GenericInput
          placeholder="agrega un comentario"
          value={comment}
          onChangeText={setComment}
          customStyle={{ borderRadius: 5 }}
        />
        <GenericButton
          onPress={handleComment}
          text={"Enviar"}
          customStyle={styles.btn}
        />
      </View>
    </View>
  );
};

export default Comments;
