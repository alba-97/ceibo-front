import { StatusBar, LogBox } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import store from "./state/store";
import { SharedRefetchProvider } from "./sharedRefetchContext";
import AppNavigator from "./navigation/AppNavigator";

LogBox.ignoreLogs(["The useProxy option is deprecated"]);

export default function App() {
  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("#000000");
  return (
    <Provider store={store}>
      <SharedRefetchProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <AppNavigator />
        </KeyboardAvoidingView>
      </SharedRefetchProvider>
    </Provider>
  );
}
