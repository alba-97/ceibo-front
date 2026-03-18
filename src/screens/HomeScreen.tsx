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
      const userData = await getUser();
      return userData;
    } catch (err) {
      return;
    }
  };

  const fetchData = async () => {
    try {
      const userData = await fetchUser();
      if (!userData) {
        const { data: events } = await getAllEvents();
        dispatch(setEvents(events));
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
          <MainEvent
            event={events[0]}
            title="Featured"
            onPress={handlePress}
          />
        )}

        {user._id ? (
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            {user.recommendedEvents?.[0] ? (
              <SwiperComponent
                events={user.recommendedEvents}
                onPress={handlePress}
              />
            ) : (
              <Text style={styles.emptyText}>No events</Text>
            )}
            <Text style={styles.sectionTitle}>My events</Text>
            {user.events?.[0] ? (
              <SwiperComponent events={user.events} onPress={handlePress} />
            ) : (
              <Text style={styles.emptyText}>No events</Text>
            )}
            <Text style={styles.sectionTitle}>Created Events</Text>
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
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Events</Text>
            <SwiperComponent events={events} onPress={handlePress} />
          </View>
        )}
      </AppScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#121212",
  },
  scrollContent: {
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F0F0F0",
    marginTop: 28,
    marginBottom: 14,
  },
  emptyText: {
    color: "#666",
    fontSize: 15,
    marginBottom: 10,
  },
});
