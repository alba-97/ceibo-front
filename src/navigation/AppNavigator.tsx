import { NavigationContainer } from "@react-navigation/native";
import BottomNavbar from "./BottomNavbar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function AppNavigator() {
  const { refresh } = useSelector((state: RootState) => state.common);

  return (
    <NavigationContainer>
      <BottomNavbar key={`${refresh}`} />
    </NavigationContainer>
  );
}
