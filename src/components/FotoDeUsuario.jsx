import React from 'react';
import { View, Image,StyleSheet } from 'react-native';

export const FotoDeUsuario = ({ imageSource }) => {
    return (
      <View style={styles.container}>
        <Image source={{uri: imageSource}} style={styles.image} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
    borderStyle: 'solid',
    alignItems:"center",
    justifyContent: "center",
     
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
})