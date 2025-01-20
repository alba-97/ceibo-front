import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import BottomNavbar from "./BottomNavbar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function AppNavigator() {
  const prefix = Linking.createURL("/");
  const { refresh } = useSelector((state: RootState) => state.common);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        EventDetail: "EventDetail",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <BottomNavbar key={`${refresh}`} />
    </NavigationContainer>
  );
}
