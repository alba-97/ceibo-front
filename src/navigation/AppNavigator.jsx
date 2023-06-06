import React from "react";
import { bottomNavigationBarStyle } from "../styles/navigationBarStyles";
// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddPlanScreen from "../screens/AddPlanScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import { LinearGradient } from "expo-linear-gradient";
// Icons
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const { size, color, backgroundColor } = bottomNavigationBarStyle;

function NavbarStack() {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStackNavigator.Screen name="Profile" component={ProfileScreen} />
      <HomeStackNavigator.Screen
        name="AddPlanScreen"
        component={AddPlanScreen}
      />
      <HomeStackNavigator.Screen name="Calendar" component={CalendarScreen} />
      <HomeStackNavigator.Screen name="Search" component={SearchScreen} />

      <HomeStackNavigator.Screen name="Login" component={LoginScreen} />
      <HomeStackNavigator.Screen name="Register" component={RegisterScreen} />
    </HomeStackNavigator.Navigator>
  );
}

function BottomNavbar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarStyle: { backgroundColor },
      }}
    >
      <Tab.Screen
        name="Home"
        component={NavbarStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="search" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AddPlan"
        component={AddPlanScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MaterialIcons name="add-to-photos" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Entypo name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer>
        <BottomNavbar />
      </NavigationContainer>
    </LinearGradient>
  );
}
