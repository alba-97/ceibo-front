import getEvent from "@/api/getEvent";
import { setAuthor, setSelectedEvent } from "@/state/selectedEvent";
import handleError from "@/utils/handleError";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import ScreenStack from "./ScreenStack";

export default () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleDeepLink = async (event: { url: string }) => {
    const { url } = event;
    const urlParts = url.split("//");
    if (urlParts.length !== 2) return;

    const [scheme, route] = urlParts;
    if (!(scheme === "clubdelplan:" && route)) return;

    try {
      const updatedEvent = await getEvent(route);
      dispatch(setSelectedEvent(updatedEvent));
      dispatch(setAuthor(updatedEvent.createdBy));
      navigation.navigate("EventDetail");
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const handleUrlChange = (event: { url: string }) => {
      handleDeepLink(event);
    };
    const subscription = Linking.addEventListener("url", handleUrlChange);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.backgroundColor,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: { alignItems: "center", justifyContent: "center" },
      }}
    >
      <Screen
        name="Home"
        component={() => <ScreenStack name={"HomeScreen"} />}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="home" size={30} color={"#fff"} />,
        }}
      />
      <Screen
        name="Search"
        component={() => <ScreenStack name={"Search"} />}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="search" size={30} color={"#fff"} />,
        }}
      />
      <Screen
        name="AddEvent"
        component={() => <ScreenStack name={"AddEventScreen1"} />}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MaterialIcons name="add-to-photos" size={30} color={"#fff"} />
          ),
        }}
      />
      {Platform.OS !== "web" && (
        <Screen
          name="Contacts"
          component={() => <ScreenStack name={"AddContact"} />}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <AntDesign name="contacts" size={30} color={"#fff"} />
            ),
          }}
        />
      )}
      <Screen
        name="Profile"
        component={() => <ScreenStack name={"Profile"} />}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={30} color={"#fff"} />
          ),
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  backgroundColor: { backgroundColor: "black" },
});
