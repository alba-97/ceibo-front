import { Text } from "react-native";
import { styles } from "../appCss";
import { LinearGradient } from "expo-linear-gradient";
import { VistaUser } from "../components/VistaUser";
import { Navbar } from "../components/Navbar";

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <VistaUser></VistaUser>
    </LinearGradient>
  );
}
