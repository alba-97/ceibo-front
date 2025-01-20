import { View, Text } from "react-native";
import Rating from "./Rating";
import { styles } from "../../styles/EventDetails";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import fromDateToDateDescription from "@/utils/fromDateToDateDescription";

interface IEventEndedProps {
  event: EventResponse;
  user: UserResponse;
}

const EventEnded = ({ event, user }: IEventEndedProps) => {
  const formattingDate = fromDateToDateDescription(event?.end_date);
  const time = event?.end_date.split("T")[1].slice(0, 5);

  return (
    <View>
      <Text style={styles.subtitle}>
        El evento finalizó el {formattingDate} a a las {time} hs.
      </Text>

      {user._id &&
        user.history &&
        user.history.some((item) => item._id == event._id) &&
        event.organizer?._id !== user._id &&
        event.ended && <Rating event={event} />}
    </View>
  );
};

export default EventEnded;
