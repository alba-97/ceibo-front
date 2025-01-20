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

interface IScreenStackProps {
  name: string;
}

const screens = [
  { name: "HomeScreen", component: HomeScreen },
  { name: "Preferences", component: PreferencesScreen },
  { name: "EditEvent", component: EditEventScreen },
  { name: "Profile", component: ProfileScreen },
  { name: "AddEventScreen1", component: AddEventScreen1 },
  { name: "AddEventScreen2", component: AddEventScreen2 },
  { name: "Search", component: SearchScreen },
  { name: "EventDetail", component: EventDetailScreen },
  { name: "ContactInfoScreen", component: ContactInfoScreen },
  { name: "AddContact", component: AddContactScreen },
  { name: "Login", component: LoginScreen },
  { name: "Register", component: RegisterScreen },
  { name: "Contacts", component: ContactsScreen },
];

const orderedScreens = (name: string) => {
  const mainScreen = screens.find((screen) => screen.name === name);

  const filteredScreens = screens.filter((screen) => {
    return screen.name !== name;
  });

  if (!mainScreen) {
    return filteredScreens;
  }

  return [mainScreen, ...filteredScreens];
};

const ScreenStack = ({ name }: IScreenStackProps) => {
  const { Navigator, Screen } = createNativeStackNavigator();

  const screens = orderedScreens(name);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((screen) => (
        <Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Navigator>
  );
};

export default ScreenStack;
