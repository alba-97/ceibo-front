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

const APP_NAME = "The Event Network";

const screens = [
  { name: "home", component: HomeScreen, title: "Home" },
  { name: "preferences", component: PreferencesScreen, title: "Preferences" },
  { name: "edit-event", component: EditEventScreen, title: "Edit Event" },
  { name: "profile", component: ProfileScreen, title: "Profile" },
  { name: "add-event", component: AddEventScreen1, title: "Create Event" },
  { name: "add-event-2", component: AddEventScreen2, title: "Create Event" },
  { name: "search", component: SearchScreen, title: "Search" },
  { name: "event-detail", component: EventDetailScreen, title: "Event" },
  { name: "contact-info", component: ContactInfoScreen, title: "Contact" },
  { name: "add-contact", component: AddContactScreen, title: "Add Contact" },
  { name: "login", component: LoginScreen, title: "Login" },
  { name: "register", component: RegisterScreen, title: "Register" },
  { name: "contacts", component: ContactsScreen, title: "Contacts" },
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
            options={{ title: `${screen.title} - ${APP_NAME}` }}
          />
        ))}
      </Navigator>
      <BottomNavbar />
    </View>
  );
};

export default ScreenStack;
