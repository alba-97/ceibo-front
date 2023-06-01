import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navbar } from './components/Navbar';
import { LinearGradient } from "expo-linear-gradient";
import { VistaLogin } from './components/VistaLogin';

export default function App() {
  return (
    <View style={styles.container}>
    <LinearGradient
colors={["#000", "#7D0166"]}
start={[0, 0]}
end={[1, 1]}
style={styles.container}
> 
<Navbar/>

      <StatusBar style="auto" />
   </LinearGradient>
    </View>

  );
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
   width:'100%',
   height:'100%',
    alignItems: 'center',
    justifyContent: 'center',   
  
  },
});


         
/* <VistaAddEvent imageSource={"https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2020/10/acdc-2020.png"}/> 
 <VistaUser imageSource={"https://st2.depositphotos.com/1017732/9796/i/450/depositphotos_97968600-stock-photo-pensive-man-looking-at-the.jpg"} name={'Leon Stefano'} email={'leonstefano03@gmail.com'} number={'02345602991'} userName={'Heisenberg'} direction={'alberdi 72'} /> */