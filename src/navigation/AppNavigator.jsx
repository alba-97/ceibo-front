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
import SearchScreen from "../screens/SearchScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import ContactInfoScreen from "../screens/ContactInfoScreen";
import ContactsScreen from "../screens/ContactsScreen";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
  AntDesign,
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
      <HomeStackNavigator.Screen name="Search" component={SearchScreen} />
      <HomeStackNavigator.Screen
        name="PlanDetail"
        component={PlanDetailScreen}
      />
      <HomeStackNavigator.Screen
        name="ContactInfoScreen"
        component={ContactInfoScreen}
      />
      <HomeStackNavigator.Screen name="Login" component={LoginScreen} />
      <HomeStackNavigator.Screen name="Register" component={RegisterScreen} />
      <HomeStackNavigator.Screen name="Contacts" component={ContactsScreen} />
    </HomeStackNavigator.Navigator>
  );
}

function BottomNavbar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarStyle: { backgroundColor, height: "8%", borderTopWidth: 1.5 },

        tabBarHideOnKeyboard: true,

        tabBarIconStyle: { alignItems: "center", justifyContent: "center" },
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
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <AntDesign name="contacts" size={size} color={color} />
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
    <NavigationContainer>
      <BottomNavbar />
    </NavigationContainer>
  );
}
