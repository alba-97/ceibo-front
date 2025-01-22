import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: 370,
    height: 150,
  },
  overlay: {
    position: "absolute",
    height: 150,
    width: 370,
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
    marginBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
