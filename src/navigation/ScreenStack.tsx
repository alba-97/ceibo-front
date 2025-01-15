import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlanScreen1 from "@/screens/AddPlanScreen1";
import AddPlanScreen2 from "@/screens/AddPlanScreen2";
import ContactInfoScreen from "@/screens/ContactInfoScreen";
import EditPlanScreen from "@/screens/EditPlanScreen";
import HomeScreen from "@/screens/HomeScreen";
import PlanDetailScreen from "@/screens/PlanDetailScreen";
import PreferencesScreen from "@/screens/PreferencesScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SearchScreen from "@/screens/SearchScreen";
import AddContactScreen from "@/screens/AddContactScreen";
import LoginScreen from "@/screens/LoginScreen";
import EditProfile from "@/screens/EditProfile";
import ContactsScreen from "@/screens/ContactsScreen";
import RegisterScreen from "@/screens/RegisterScreen";

interface IScreenStackProps {
  name: string;
}

const screens = [
  { name: "HomeScreen", component: HomeScreen },
  { name: "Preferences", component: PreferencesScreen },
  { name: "EditPlan", component: EditPlanScreen },
  { name: "Profile", component: ProfileScreen },
  { name: "AddPlanScreen1", component: AddPlanScreen1 },
  { name: "AddPlanScreen2", component: AddPlanScreen2 },
  { name: "Search", component: SearchScreen },
  { name: "PlanDetail", component: PlanDetailScreen },
  { name: "ContactInfoScreen", component: ContactInfoScreen },
  { name: "AddContact", component: AddContactScreen },
  { name: "Login", component: LoginScreen },
  { name: "Register", component: RegisterScreen },
  { name: "Contacts", component: ContactsScreen },
  { name: "EditProfile", component: EditProfile },
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
