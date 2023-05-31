import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GenericInput } from './components/TextInput';
import { ImageContainer } from './components/ImageContainer';
import { TextDeUsuario } from './components/TextDeUsuario';
import { FotoDeUsuario } from './components/FotoDeUsuario';
import Calendar from './components/Calendar';

export default function App() {
  return (
    <View style={styles.container}>
    

<ImageContainer
        imageSource="https://www.billboard.com/wp-content/uploads/2022/09/bad-bunny-press-credit-eric-rojas-2022-billboard-2-1548.jpg?w=942&h=623&crop=1"
        date="28 de mayo de 2023"
        event="Conejo malo"
      />
      <GenericInput
        // otras propiedades
      />
      
      <TextDeUsuario text="Leon Stefano" />
         
      <FotoDeUsuario imageSource="https://st2.depositphotos.com/1017732/9796/i/450/depositphotos_97968600-stock-photo-pensive-man-looking-at-the.jpg"/>
<Calendar/>
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
