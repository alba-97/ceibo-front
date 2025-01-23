import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import EventResponse from "@/interfaces/responses/Event";

interface IEventOrganizerProps {
  event: EventResponse;
  rating?: number;
}

const EventOrganizer = ({ event, rating }: IEventOrganizerProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.logoText}>Organizer</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.p}>{event?.createdBy?.username}</Text>
        <Text style={styles.p}>
          {rating && (
            <>
              {rating.toFixed(2)}/5.00
              <Entypo name="star" size={20} color={"#fdd835"} />
            </>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  p: {
    fontSize: 18,
    color: "#fff",
    paddingRight: 40,
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

export default EventOrganizer;
