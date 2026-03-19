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
import { T } from "@/theme";

export default function EventDetailScreen() {
  const event = useSelector((state: RootState) => state.selectedEvent);
  const user = useSelector((state: RootState) => state.user);
  const [rating, setRating] = useState<number>();

  useEffect(() => {
    getOrganizerRating(event._id)
      .then(({ rating: r }) => setRating(r))
      .catch(() => {});
  }, []);

  return (
    <AppGradient style={styles.gradient}>
      <Navbar />
      <AppScrollView
        style={styles.scrollview}
        contentContainerStyle={{ alignItems: "flex-start" }}
      >
        {event.img && (
          <View style={styles.heroContainer}>
            <Image source={{ uri: event.img }} style={styles.eventImage} />
            <LinearGradient
              colors={["transparent", "rgba(7, 9, 15, 0.92)"]}
              style={styles.heroOverlay}
            >
              <Text style={styles.title}>{event.title}</Text>
            </LinearGradient>
          </View>
        )}

        <View style={styles.eventContainer}>
          {event.ended ? <EventEnded event={event} user={user} /> : <Enroll />}

          <EventOrganizer event={event} rating={rating} />

          <View style={styles.descriptionBlock}>
            <Text style={styles.sectionLabel}>Description</Text>
            <View style={styles.accentLine} />
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {user._id && (
            <View style={styles.actionsBlock}>
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
    height: 300,
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 80,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: T.text,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eventContainer: {
    padding: 20,
    paddingTop: 16,
    width: "100%",
  },
  descriptionBlock: {
    marginTop: 24,
    backgroundColor: T.bgCard,
    borderRadius: T.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: T.border,
  },
  sectionLabel: {
    color: T.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  accentLine: {
    width: 24,
    height: 2,
    backgroundColor: T.accent,
    borderRadius: 1,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: T.text,
    lineHeight: 24,
  },
  actionsBlock: {
    marginTop: 20,
    gap: 8,
  },
});
