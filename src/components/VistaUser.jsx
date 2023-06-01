import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { TextDeUsuario } from "./TextDeUsuario";
import { FotoDeUsuario } from "./FotoDeUsuario";

export const VistaUser = ({ imageSource,  name,email, number,userName,direction,}) => {
  return (
    <View style={styles.container}>
     <FotoDeUsuario style ={styles.foto}imageSource={imageSource}/>
     <TextDeUsuario text={name} />
     <TextDeUsuario text={email} />
     <TextDeUsuario text={number} />
     <TextDeUsuario text={userName} />
     <TextDeUsuario text={direction} />
    </View>
  );
};
const styles = StyleSheet.create({

    container: {
        flex: 1,
       width:'100%',
       height:'100%',
        alignItems: 'center',
       justifyContent: 'center',   
      
      },
foto:{
},
 
});
