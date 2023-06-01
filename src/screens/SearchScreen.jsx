import { Text } from "react-native";
import { VistaLogin } from "../components/VistaLogin";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../appCss";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <VistaLogin></VistaLogin>
    </LinearGradient>
  );
}