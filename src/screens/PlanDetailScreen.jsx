import { PlanDetailCard } from "../components/PlanDetailCard";
import { Navbar } from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function PlanDetailScreen() {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <PlanDetailCard />
    </LinearGradient>
  );
}
