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
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = async () => {
    let newComment = await addComment(comment, plan._id);
    dispatch(setComments(newComment));
  };

  return (
    <>
      <Text style={styles.subtitle}>Comentarios:</Text>
      <View
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
            if (index < page * 5 && index >= (page - 1) * 5)
              return (
                <View key={index}>
                  <Text style={styles.username}>{item.user.username}:</Text>
                  <Text style={styles.comment}>{item.text}</Text>
                </View>
              );
          })}
        <View style={{ marginBottom: 30 }}></View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {page > 1 ? (
          <Text
            style={{ color: "#fff", fontSize: 40 }}
            onPress={() => {
              setPage(page - 1);
            }}
          >
            {"<"}
          </Text>
        ) : (
          <Text></Text>
        )}
        {plan.comments.length - (page + 1) * 5 >= -4 ? (
          <Text
            style={{
              color: "#fff",
              fontSize: 40,
            }}
            onPress={() => {
              setPage(page + 1);
            }}
          >
            {">"}
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.inputCont}>
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
    </>
  );
};

export default Comments;
