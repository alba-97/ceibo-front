import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ScreenStack from "./ScreenStack";

export default function AppNavigator() {
  const { refresh } = useSelector((state: RootState) => state.common);

  const linking = {
    prefixes: [],
    config: {
      screens: {},
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <ScreenStack key={`${refresh}`} />
    </NavigationContainer>
  );
}
