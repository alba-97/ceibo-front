import React from "react";
import Navigation from "./navigation/AppNavigator";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function App() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Navigation />
    </KeyboardAvoidingView>
  );
}
