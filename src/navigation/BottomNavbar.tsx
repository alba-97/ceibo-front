import getOrganizer from "@/api/getOrganizer";
import getPlan from "@/api/getPlan";
import { setOrganizer, setSelectedPlan } from "@/state/selectedPlan";
import handleError from "@/utils/handleError";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import NavbarStack from "./NavbarStack";
import { bottomNavigationBarStyle } from "@/styles/navigationBarStyles";
import SearchScreen from "@/screens/SearchScreen";
import AddPlanScreen1 from "@/screens/AddPlanScreen1";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ContactsScreen from "@/screens/ContactsScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const BottomNavbar = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleDeepLink = async (event: { url: string }) => {
    const { url } = event;
    const urlParts = url.split("//");
    if (urlParts.length !== 2) return;

    const [scheme, route] = urlParts;
    if (!(scheme === "clubdelplan:" && route)) return;

    try {
      const updatedPlan = await getPlan(route);
      dispatch(setSelectedPlan(updatedPlan));
      const organizer = await getOrganizer(route);
      dispatch(setOrganizer(organizer));
      navigation.navigate("PlanDetail");
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
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: bottomNavigationBarStyle.backgroundColor,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: { alignItems: "center", justifyContent: "center" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={NavbarStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="home" size={30} color={"#fff"} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="search" size={30} color={"#fff"} />,
        }}
      />
      <Tab.Screen
        name="AddPlan"
        component={AddPlanScreen1}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MaterialIcons name="add-to-photos" size={30} color={"#fff"} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <AntDesign name="contacts" size={30} color={"#fff"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={30} color={"#fff"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;
