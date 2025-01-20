import { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import GenericInput from "@/components/GenericInput";
import { useDispatch } from "react-redux";
import { styles } from "@/styles/EventDetails";
import addComment from "@/api/addComment";
import { setComments } from "@/state/selectedEvent";
import { Feather } from "@expo/vector-icons";
import comentarios from "@/assets/comentarios.png";
import EventResponse from "@/interfaces/responses/Event";
import handleError from "@/utils/handleError";

interface ICommentsProps {
  event: EventResponse;
}

const Comments = ({ event }: ICommentsProps) => {
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = async () => {
    if (!event._id) return;
    try {
      const newComment = await addComment(comment, event._id);
      dispatch(setComments(newComment));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <View>
      <Image style={styles.logo4} source={comentarios} />
      <View
        style={{
          height: 280,
          borderRadius: 15,
          marginTop: 5,
          padding: 10,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        {event.comments &&
          event.comments.map((item, index) => {
            if (index < page * 4 && index >= (page - 1) * 4)
              return (
                <View style={styles.commentContainer} key={index}>
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
            {"<<"}
          </Text>
        ) : (
          <Text></Text>
        )}
        {event.comments.length - (page + 1) * 4 >= -4 ? (
          <Text
            style={{
              color: "#fff",
              fontSize: 40,
            }}
            onPress={() => {
              setPage(page + 1);
            }}
          >
            {">>"}
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
          customStyle={{
            borderRadius: 15,
            fontSize: 16,
            color: "white",
            backgroundColor: "#22001b",
            width: "80%",
          }}
        />

        <TouchableOpacity onPress={handleComment}>
          <Feather name="arrow-right" size={30} color="white" style={{}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
