import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { GenericInput } from './components/TextInput';
// import { ImageContainer } from './components/ImageContainer';
// import { TextDeUsuario } from './components/TextDeUsuario';
// import { FotoDeUsuario } from './components/FotoDeUsuario';
// import Calendar from './components/Calendar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
