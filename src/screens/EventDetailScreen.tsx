import { Text, Image, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Comments from "../components/Event/Comments";
import EventOrganizer from "../components/Event/Organizer";
import EventEnded from "../components/Event/Ended";
import EventInvite from "../components/Event/Invite";
import EventEnroll from "../components/Event/Enroll";
import EventEdit from "../components/Event/Edit";
import descripcion from "../assets/descripcion.png";
import { Navbar } from "../components/Navbar";
import { RootState } from "@/state/store";
import AppScrollView from "@/components/AppScrollView";
import AppGradient from "@/components/AppGradient";
import { useEffect, useState } from "react";
import getRating from "@/api/getRating";

export default function EventDetailScreen() {
  const event = useSelector((state: RootState) => state.selectedEvent);
  const user = useSelector((state: RootState) => state.user);
  const [rating, setRating] = useState<number>();

  const fetchRating = async () => {
    const { rating } = await getRating(event._id);
    setRating(rating);
  };

  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <AppGradient style={styles.gradient}>
      <Navbar />
      <AppScrollView>
        <View>
          <Text style={styles.title}>{event?.title}</Text>
          <Image source={{ uri: event?.img }} style={styles.eventImage} />
        </View>
        <View style={styles.eventContainer}>
          <View>
            {event.ended ? (
              <EventEnded event={event} user={user} />
            ) : (
              <EventEnroll event={event} user={user} />
            )}
          </View>

          <EventOrganizer event={event} rating={rating} />

          <Image style={styles.descriptionLogo} source={descripcion} />
          <Text style={styles.description}>{event.description}</Text>
          {user._id && (
            <View>
              <Comments event={event} />
              <EventEdit event={event} />
              <EventInvite event={event} />
            </View>
          )}
        </View>
      </AppScrollView>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    color: "#fff",
  },
  eventContainer: {
    justifyContent: "center",
    marginTop: 5,
    padding: 20,
  },
  descriptionLogo: {
    width: 130,
    height: 26,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: "#fff",
  },
  eventImage: {
    width: "100%",
    height: 200,
  },
});
