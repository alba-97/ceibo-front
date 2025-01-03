import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import BottomNavbar from "./BottomNavbar";

export default function AppNavigator() {
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
