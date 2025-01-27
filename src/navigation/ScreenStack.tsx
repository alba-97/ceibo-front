import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEventScreen1 from "@/screens/AddEventScreen1";
import AddEventScreen2 from "@/screens/AddEventScreen2";
import ContactInfoScreen from "@/screens/ContactInfoScreen";
import HomeScreen from "@/screens/HomeScreen";
import PreferencesScreen from "@/screens/PreferencesScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SearchScreen from "@/screens/SearchScreen";
import AddContactScreen from "@/screens/AddContactScreen";
import LoginScreen from "@/screens/LoginScreen";
import ContactsScreen from "@/screens/ContactsScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import EditEventScreen from "@/screens/EditEventScreen";
import EventDetailScreen from "@/screens/EventDetailScreen";
import { View } from "react-native";
import BottomNavbar from "./BottomNavbar";

const screens = [
  { name: "home", component: HomeScreen },
  { name: "preferences", component: PreferencesScreen },
  { name: "edit-event", component: EditEventScreen },
  { name: "profile", component: ProfileScreen },
  { name: "add-event", component: AddEventScreen1 },
  { name: "add-event-2", component: AddEventScreen2 },
  { name: "search", component: SearchScreen },
  { name: "event-detail", component: EventDetailScreen },
  { name: "contact-info", component: ContactInfoScreen },
  { name: "add-contact", component: AddContactScreen },
  { name: "login", component: LoginScreen },
  { name: "register", component: RegisterScreen },
  { name: "contacts", component: ContactsScreen },
];

const ScreenStack = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="home"
      >
        {screens.map((screen) => (
          <Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Navigator>
      <BottomNavbar />
    </View>
  );
};

export default ScreenStack;
