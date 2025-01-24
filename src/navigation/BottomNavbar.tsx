import getEvent from "@/api/getEvent";
import { setAuthor, setSelectedEvent } from "@/state/selectedEvent";
import handleError from "@/utils/handleError";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CommonActions,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
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

const HomeScreen = () => <ScreenStack name={"Home"} />;
const SearchScreen = () => <ScreenStack name={"Search"} />;
const AddEventScreen = () => <ScreenStack name={"AddEvent1"} />;
const AddContactScreen = () => <ScreenStack name={"AddContact"} />;
const ProfileScreen = () => <ScreenStack name={"Profile"} />;

const { Navigator, Screen } = createBottomTabNavigator();

export default () => {
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

  const resetTabStacks = () => ({
    blur: () => {
      const state = navigation.getState();
      navigation.dispatch(
        CommonActions.reset({
          index: state.index,
          routes: [{ name: state.routeNames[state.index] }],
        })
      );
    },
  });

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
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="home" size={30} color={"#fff"} />,
        }}
        listeners={resetTabStacks}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="search" size={30} color={"#fff"} />,
        }}
        listeners={resetTabStacks}
      />
      <Screen
        name="AddEvent1"
        component={AddEventScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MaterialIcons name="add-to-photos" size={30} color={"#fff"} />
          ),
        }}
        listeners={resetTabStacks}
      />
      {Platform.OS !== "web" && (
        <Screen
          name="Contacts"
          component={AddContactScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <AntDesign name="contacts" size={30} color={"#fff"} />
            ),
          }}
          listeners={resetTabStacks}
        />
      )}
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={30} color={"#fff"} />
          ),
        }}
        listeners={resetTabStacks}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  backgroundColor: { backgroundColor: "black" },
});
