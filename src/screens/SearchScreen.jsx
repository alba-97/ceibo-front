import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../appCss";
import { ProfileScreen } from "./ProfileScreen";
import { Navbar } from "../components/Navbar";

export default function SearchScreen() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
    </LinearGradient>
  );
}
