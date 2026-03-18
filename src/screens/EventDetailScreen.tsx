import { Text, Image, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import Comments from "../components/Event/Comments";
import EventOrganizer from "../components/Event/Organizer";
import EventEnded from "../components/Event/Ended";
import EventInvite from "../components/Event/Invite";
import Enroll from "../components/Event/Enroll";
import EventEdit from "../components/Event/Edit";
import { Navbar } from "../components/Navbar";
import { RootState } from "@/state/store";
import AppScrollView from "@/components/AppScrollView";
import AppGradient from "@/components/AppGradient";
import { useEffect, useState } from "react";
import getOrganizerRating from "@/api/getOrganizerRating";

export default function EventDetailScreen() {
  const event = useSelector((state: RootState) => state.selectedEvent);
  const user = useSelector((state: RootState) => state.user);
  const [rating, setRating] = useState<number>();

  useEffect(() => {
    getOrganizerRating(event._id)
      .then(({ rating }) => setRating(rating))
      .catch(() => {});
  }, []);

  return (
    <AppGradient style={styles.gradient}>
      <Navbar />
      <AppScrollView style={styles.scrollview} contentContainerStyle={{ alignItems: "flex-start" }}>
        {event.img && (
          <View style={styles.heroContainer}>
            <Image source={{ uri: event.img }} style={styles.eventImage} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.75)"]}
              style={styles.heroOverlay}
            >
              <Text style={styles.title}>{event.title}</Text>
            </LinearGradient>
          </View>
        )}
        <View style={styles.eventContainer}>
          <View>
            {event.ended ? (
              <EventEnded event={event} user={user} />
            ) : (
              <Enroll />
            )}
          </View>

          <EventOrganizer event={event} rating={rating} />

          <Text style={styles.logoText}>Description</Text>
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
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
  heroContainer: {
    width: "100%",
    height: 280,
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 32,
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
    height: "100%",
    resizeMode: "cover",
  },
  logoText: {
    color: "#F0F0F0",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 24,
  },
});
