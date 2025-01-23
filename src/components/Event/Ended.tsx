import { View, Text, StyleSheet } from "react-native";
import Rating from "./Rating";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import fromDateToDateDescription from "@/utils/fromDateToDateDescription";

interface IEventEndedProps {
  event: EventResponse;
  user: UserResponse;
}

export default ({ event, user }: IEventEndedProps) => {
  const formattingDate = fromDateToDateDescription(event?.end_date);
  const time = event?.end_date.split("T")[1].slice(0, 5);

  return (
    <View>
      <Text style={styles.subtitle}>
        El evento finalizó el {formattingDate} a a las {time} hs.
      </Text>

      {user.events?.some((item) => item._id == event._id) &&
        event.createdBy?._id !== user._id &&
        event.ended && <Rating event={event} />}
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
    marginTop: 15,
  },
});
