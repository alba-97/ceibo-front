import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import GenericInput from "@/components/GenericInput";
import { useDispatch } from "react-redux";
import addComment from "@/api/addComment";
import { setComments } from "@/state/selectedEvent";
import { Feather } from "@expo/vector-icons";
import EventResponse from "@/interfaces/responses/Event";
import handleError from "@/utils/handleError";

interface ICommentsProps {
  event: EventResponse;
}

export default ({ event }: ICommentsProps) => {
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
      <Text style={styles.logoText}>Comments</Text>
      <View style={styles.container}>
        {event.comments[0] ? (
          event.comments.map((item, index) => {
            if (index < page * 4 && index >= (page - 1) * 4)
              return (
                <View style={styles.comment} key={index}>
                  <Text style={styles.username}>{item.user.username}:</Text>
                  <Text style={styles.comment}>{item.text}</Text>
                </View>
              );
          })
        ) : (
          <Text style={styles.noComments}>No comments...</Text>
        )}
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {page > 1 && (
          <Text
            style={styles.arrow}
            onPress={() => {
              setPage(page - 1);
            }}
          >
            {"<<"}
          </Text>
        )}
        {event.comments.length - (page + 1) * 4 >= -4 && (
          <Text
            style={styles.arrow}
            onPress={() => {
              setPage(page + 1);
            }}
          >
            {">>"}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <GenericInput
          placeholder="Add comment"
          value={comment}
          onChangeText={setComment}
          customStyle={styles.input}
        />
        <TouchableOpacity onPress={handleComment}>
          <Feather name="arrow-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  logo: {
    width: 140,
    height: 25,
    marginTop: 10,
  },
  logoText: {
    color: "#F0F0F0",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 24,
  },
  username: {
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 10,
  },
  comment: {
    fontSize: 14,
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    fontSize: 16,
    color: "white",
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    flex: 1,
  },
  noComments: {
    color: "white",
  },
  arrow: { color: "#fff", fontSize: 40 },
});
