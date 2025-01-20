import { View, Image, Text, TouchableOpacity } from "react-native";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
import styles from "../styles/ImageContainerStyles";
import EventResponse from "@/interfaces/responses/Event";

interface IMainEventProps {
  event: EventResponse;
  onPress: (event: EventResponse) => void;
}

export const ImageContainer = ({ event, onPress }: IMainEventProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(event)}>
      <Image source={{ uri: event?.img }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.text}>{event?.title}</Text>
        <Text style={styles.subtitle}>
          {event?.start_date && fromDateToDateDescription(event?.start_date)}
        </Text>
        <Text style={styles.subtitle}>{event?.category?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
