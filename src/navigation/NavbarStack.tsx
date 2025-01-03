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

const NavbarStack = () => {
  const HomeStackNavigator = createNativeStackNavigator();
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
};

export default NavbarStack;
