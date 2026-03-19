import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Navbar } from "@/components/Navbar";
import { SwiperComponent } from "@/components/SwiperComponent";
import { MainEvent } from "@/components/MainEvent";
import getAllEvents from "@/api/getAllEvents";
import getUser from "@/api/getUser";
import getEvent from "@/api/getEvent";
import { useSelector, useDispatch } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { setSelectedEvent, setAuthor } from "@/state/selectedEvent";
import { setUser, setRecommendedEvents } from "@/state/user";
import { setEvents } from "@/state/events";
import { RootState } from "@/state/store";
import EventResponse from "@/interfaces/responses/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import getRecommendedEvents from "@/api/getRecommendedEvents";
import { T } from "@/theme";

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user);
  const events = useSelector((state: RootState) => state.events);
  const { refetch } = useSelector((state: RootState) => state.common);

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePress = async (event: EventResponse) => {
    try {
      const updatedEvent = await getEvent(event._id);
      dispatch(setSelectedEvent(updatedEvent));
      dispatch(setAuthor(updatedEvent.createdBy));
      navigation.navigate("event-detail");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchUser = async () => {
    try {
      return await getUser();
    } catch {
      return;
    }
  };

  const fetchData = async () => {
    try {
      const userData = await fetchUser();
      if (!userData) {
        const { data: evts } = await getAllEvents();
        dispatch(setEvents(evts));
        return;
      }
      dispatch(setUser(userData));

      if (userData.preferences[0]) {
        const { data: recommendedEvents } = await getRecommendedEvents();
        dispatch(setRecommendedEvents(recommendedEvents));
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return (
    <View style={styles.screen}>
      <Navbar />
      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {events[0] && (
          <MainEvent event={events[0]} title="Featured" onPress={handlePress} />
        )}

        {user._id ? (
          <View style={styles.sections}>
            <SectionHeader label="Recommended" />
            {user.recommendedEvents?.[0] ? (
              <SwiperComponent
                events={user.recommendedEvents}
                onPress={handlePress}
              />
            ) : (
              <Text style={styles.emptyText}>No recommendations yet</Text>
            )}

            <SectionHeader label="My Events" />
            {user.events?.[0] ? (
              <SwiperComponent events={user.events} onPress={handlePress} />
            ) : (
              <Text style={styles.emptyText}>No enrolled events</Text>
            )}

            <SectionHeader label="Created" />
            {user.createdEvents?.[0] ? (
              <SwiperComponent
                events={user.createdEvents}
                onPress={handlePress}
              />
            ) : (
              <Text style={styles.emptyText}>No created events</Text>
            )}
          </View>
        ) : (
          <View style={styles.sections}>
            <SectionHeader label="All Events" />
            <SwiperComponent events={events} onPress={handlePress} />
          </View>
        )}
      </AppScrollView>
    </View>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={sectionStyles.row}>
      <View style={sectionStyles.dot} />
      <Text style={sectionStyles.text}>{label}</Text>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 14,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: T.accent,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
    color: T.text,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: T.bg,
  },
  scrollContent: {
    alignItems: "center",
  },
  sections: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  emptyText: {
    color: T.textMuted,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 2,
  },
});
