import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericButton from "@/components/GenericButton";
import enroll from "@/api/enroll";
import { useDispatch, useSelector } from "react-redux";
import discardUser from "@/api/discardUser";
import EventResponse from "@/interfaces/responses/Event";
import { addUserEvent, removeUserEvent } from "@/state/user";
import handleError from "@/utils/handleError";
import formatDate from "@/utils/formatDate";
import { RootState } from "@/state/store";

export default () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const event = useSelector((state: RootState) => state.selectedEvent);
  const user = useSelector((state: RootState) => state.user);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await enroll(event._id);
      dispatch(addUserEvent(event));
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleStopParticipating = async () => {
    setLoading(true);
    try {
      await discardUser(event._id);
      dispatch(removeUserEvent(event._id));
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  return (
    <View>
      {user._id && event._id && (
        <View style={styles.buttonContainer}>
          {!user.events?.some(
            (userEvent: EventResponse) => userEvent._id === event._id
          ) ? (
            <View>
              {!loading ? (
                <GenericButton
                  text={"Join Event"}
                  onPress={handleEnroll}
                  buttonStyle={styles.button}
                />
              ) : (
                <GenericButton text={"..."} buttonStyle={styles.button} />
              )}
            </View>
          ) : (
            <View>
              {!loading ? (
                <GenericButton
                  text={"Stop participating"}
                  buttonStyle={styles.button}
                  onPress={handleStopParticipating}
                />
              ) : (
                <GenericButton text={"..."} buttonStyle={styles.button} />
              )}
            </View>
          )}
        </View>
      )}
      <View>
        <Text style={styles.logoText}>Date</Text>
        <Text style={styles.text}>{formatDate(event.start_date)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 300,
    fontSize: 18,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
  },
  logoText: {
    fontFamily: "Melts",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
    fontSize: 40,
    marginVertical: 20,
  },
});
