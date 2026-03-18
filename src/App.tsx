import { StatusBar, LogBox } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import store from "./state/store";
import AppNavigator from "./navigation/AppNavigator";
import { ToastContainer } from "react-toastify";

LogBox.ignoreLogs(["The useProxy option is deprecated"]);

export default function App() {
  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("#000000");

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {Platform.OS === "web" && <ToastContainer />}
        <AppNavigator />
      </KeyboardAvoidingView>
    </Provider>
  );
}
