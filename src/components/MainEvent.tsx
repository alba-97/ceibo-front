import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
import EventResponse from "@/interfaces/responses/Event";

interface IMainEventProps {
  event: EventResponse;
  onPress: (event: EventResponse) => void;
  title?: string;
}

export const MainEvent = ({ event, onPress, title }: IMainEventProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(event)}
      activeOpacity={0.92}
    >
      <Image source={{ uri: event?.img }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.75)"]}
        style={styles.overlay}
      >
        {title && <Text style={styles.badge}>{title}</Text>}
        <Text style={styles.title}>{event?.title}</Text>
        <Text style={styles.subtitle}>
          {event?.start_date && fromDateToDateDescription(event?.start_date)}
          {event?.category?.name ? `  ·  ${event.category.name}` : ""}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 280,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
    justifyContent: "flex-end",
  },
  badge: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
    opacity: 0.8,
  },
  title: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 6,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontWeight: "500",
  },
});
