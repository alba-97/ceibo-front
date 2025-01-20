import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles/mainEvent";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
import EventResponse from "@/interfaces/responses/Event";

interface IMainEventProps {
  event: EventResponse;
  onPress: (event: EventResponse) => void;
  title?: string;
}

export const MainEvent = ({ event, onPress }: IMainEventProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(event)}>
      <View>
        <Image source={{ uri: event?.img }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text}>{event?.title}</Text>
          <Text style={styles.subtitle}>
            {event?.start_date && fromDateToDateDescription(event?.start_date)}
          </Text>
          <Text style={styles.subtitle}>{event?.category?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
