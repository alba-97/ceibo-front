import React from "react";
import Navigation from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { KeyboardAvoidingView, Platform } from "react-native";
<<<<<<< HEAD
import { store } from "./state/store";
=======
import store from "./state/store";
import { Provider } from "react-redux";
>>>>>>> develop

export default function App() {
  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Navigation />
      </KeyboardAvoidingView>
    </Provider>
  );
}
