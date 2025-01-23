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
import {
  setCreatedEvents,
  setUserEvents,
  setUser,
  setRecommendedEvents,
} from "@/state/user";
import { setEvents } from "@/state/events";
import { RootState } from "@/state/store";
import EventResponse from "@/interfaces/responses/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";
import getCreatedEvents from "@/api/getCreatedEvents";
import getUserEvents from "@/api/getUserEvents";
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

      navigation.navigate("EventDetail");
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

      const { data: userEvents } = await getUserEvents();
      dispatch(setUserEvents(userEvents));

      const { data: pastEvents } = await getCreatedEvents();
      dispatch(setCreatedEvents(pastEvents));

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
    <AppGradient style={styles.gradient}>
      <Navbar />
      <AppScrollView>
        {events[0] && (
          <MainEvent
            event={events[0]}
            title="Patrocinado"
            onPress={handlePress}
          />
        )}

        {user._id ? (
          <View style={styles.container}>
            <Text style={styles.logoText}>Recommended events</Text>
            {user.recommendedEvents?.[0] ? (
              <SwiperComponent
                events={user.recommendedEvents}
                onPress={handlePress}
              />
            ) : (
              <Text style={styles.text}>No Events</Text>
            )}
            <Text style={styles.logoText}>My Events</Text>
            {user.events?.[0] ? (
              <SwiperComponent events={user.events} onPress={handlePress} />
            ) : (
              <Text style={styles.text}>No Events</Text>
            )}
            <Text style={styles.logoText}>Created Events</Text>
            {user.createdEvents?.[0] ? (
              <SwiperComponent
                events={user.createdEvents}
                onPress={handlePress}
              />
            ) : (
              <Text style={styles.text}>No Events Created</Text>
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.logoText}>Events</Text>
            <SwiperComponent events={events} onPress={handlePress} />
          </View>
        )}
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
  container: {
    width: "90%",
    marginVertical: 20,
    alignItems: "center",
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
  text: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});
