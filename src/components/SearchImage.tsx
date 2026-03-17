import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
import EventResponse from "@/interfaces/responses/Event";

interface ISearchImageProps {
  event: EventResponse;
  onPress: (event: EventResponse) => void;
}

export default ({ event, onPress }: ISearchImageProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onPress(event)}>
        <Image source={{ uri: event?.img }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.bannerText}>{event?.title}</Text>
          <Text style={styles.bannerTextDate}>
            {event?.start_date && fromDateToDateDescription(event?.start_date)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  bannerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
  bannerTextDate: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
});
