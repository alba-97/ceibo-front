import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddPlanScreen1 from "../screens/AddPlanScreen1";
import AddPlanScreen2 from "../screens/AddPlanScreen2";
import SearchScreen from "../screens/SearchScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import ContactInfoScreen from "../screens/ContactInfoScreen";
import ContactsScreen from "../screens/ContactsScreen";
import EditProfile from "../screens/EditProfile";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EditPlanScreen from "../screens/EditPlanScreen";
import * as Linking from "expo-linking";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import PreferencesScreen from "../screens/PreferencesScreen";
import { setOrganizer, setSelectedPlan } from "../state/selectedPlan";
import getOrganizer from "../api/getOrganizer";
import getPlan from "../api/getPlan";
import { useDispatch } from "react-redux";
import AddContactScreen from "../screens/AddContactScreen";
import { bottomNavigationBarStyle } from "../styles/navigationBarStyles";
import handleError from "@/utils/handleError";

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();

function NavbarStack() {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStackNavigator.Screen
        name="Preferences"
        component={PreferencesScreen}
      />
      <HomeStackNavigator.Screen name="EditPlan" component={EditPlanScreen} />
      <HomeStackNavigator.Screen name="Profile" component={ProfileScreen} />
      <HomeStackNavigator.Screen
        name="AddPlanScreen1"
        component={AddPlanScreen1}
      />
      <HomeStackNavigator.Screen
        name="AddPlanScreen2"
        component={AddPlanScreen2}
      />
      <HomeStackNavigator.Screen name="Search" component={SearchScreen} />
      <HomeStackNavigator.Screen
        name="PlanDetail"
        component={PlanDetailScreen}
      />
      <HomeStackNavigator.Screen
        name="ContactInfoScreen"
        component={ContactInfoScreen}
      />
      <HomeStackNavigator.Screen
        name="AddContact"
        component={AddContactScreen}
      />
      <HomeStackNavigator.Screen name="Login" component={LoginScreen} />
      <HomeStackNavigator.Screen name="Register" component={RegisterScreen} />
      <HomeStackNavigator.Screen name="Contacts" component={ContactsScreen} />
      <HomeStackNavigator.Screen name="EditProfile" component={EditProfile} />
    </HomeStackNavigator.Navigator>
  );
}

function BottomNavbar() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleDeepLink = async (event: { url: string }) => {
    const { url } = event;
    const urlParts = url.split("//");
    if (urlParts.length === 2) {
      const [scheme, route] = urlParts;
      if (scheme === "clubdelplan:" && route) {
        try {
          const updatedPlan = await getPlan(route);
          dispatch(setSelectedPlan(updatedPlan));
          const organizer = await getOrganizer(route);
          dispatch(setOrganizer(organizer));
          navigation.navigate("PlanDetail");
        } catch (err) {
          handleError(err);
        }
      }
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
}

export default function Navigation() {
  const prefix = Linking.createURL("/");

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        PlanDetail: "PlanDetail",
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <BottomNavbar />
    </NavigationContainer>
  );
}
