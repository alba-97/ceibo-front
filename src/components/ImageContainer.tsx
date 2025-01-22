import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
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

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: 250,
    height: 110,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: 250,
    justifyContent: "flex-end",
    backgroundColor: "#0004",
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 7,
  },
  subtitle: {
    marginLeft: 7,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
