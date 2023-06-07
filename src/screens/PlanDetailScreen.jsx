import { LinearGradient } from "expo-linear-gradient";
import { PlanDetailCard } from "../components/PlanDetailCard";
import { Navbar } from "../components/Navbar";

export default function PlanDetailScreen({ route }) {
  const { plan } = route.params;
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <PlanDetailCard plan={plan} />
    </LinearGradient>
  );
}
