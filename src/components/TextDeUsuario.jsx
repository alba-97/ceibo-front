import React from 'react';
import { View,Text, StyleSheet, Dimensions } from 'react-native';

export const TextDeUsuario = ({ text }) => {
    return (
      <View style={styles.container}>
      
          <Text style={styles.text}>{text}</Text>
  
      </View>
    );
  };

const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth: 1,    
    borderBottomColor:'white',
    borderStyle: 'solid', 
    width: windowWidth,
    },
   
    text: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft:20,
      textAlign: 'center',
    },
  });
  