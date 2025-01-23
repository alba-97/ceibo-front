import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericButton from "../GenericButton";
import enrollUser from "../../api/enrollUser";
import { useDispatch } from "react-redux";
import discardUser from "../../api/discardUser";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import { removeUserEvent } from "@/state/user";
import handleError from "@/utils/handleError";
import formatDate from "@/utils/formatDate";

interface IEventEnrollProps {
  event: EventResponse;
  user: UserResponse;
}

const EventEnroll = ({ event, user }: IEventEnrollProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEnroll = async () => {
    if (!event._id) return;
    setLoading(true);
    try {
      await enrollUser(event._id);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleStopParticipating = async () => {
    if (!event._id) return;
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
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.logoText}>Date</Text>
        <Text style={styles.text}>{formatDate(event.start_date)}</Text>
      </View>
      {user._id && event._id && (
        <View style={styles.buttonContainer}>
          {!user.events?.some(
            (userEvent: EventResponse) => userEvent._id === event._id
          ) ? (
            <View>
              {!loading ? (
                <GenericButton
                  text={"+"}
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
                  text={"x"}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 100 },
  date: { flexDirection: "row" },
  text: {
    fontWeight: "300",
    fontSize: 18,
    color: "#fff",
  },
  buttonContainer: {
    top: -12,
  },
  button: {
    width: 60,
    height: 45,
    borderRadius: 5,
  },
  logoText: {
    fontFamily: "Melts",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
    marginBottom: 20,
    marginTop: 30,
    fontSize: 40,
    textAlign: "center",
  },
});

export default EventEnroll;
