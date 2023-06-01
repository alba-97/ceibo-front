import { Text } from "react-native";
import Calendar from "../components/Calendar";
import { styles } from "../appCss";
import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "../components/Navbar";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <Calendar></Calendar>
    </LinearGradient>
  );
}
