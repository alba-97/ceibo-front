import { View, Text, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import organizador from "../../assets/organizador.png";
import { styles } from "../../styles/PlanDetails";
import EventResponse from "@/interfaces/responses/Event";

interface IPlanOrganizerProps {
  plan: EventResponse;
}

const PlanOrganizer = ({ plan }: IPlanOrganizerProps) => {
  return (
    <View>
      <View style={styles.orgCont}>
        <Image style={styles.logo5} source={organizador} />
      </View>
      <View style={styles.pContainer}>
        <Text style={styles.p}>{plan?.organizer?.username}</Text>
        <Text style={styles.p}>
          {plan?.organizer?.rating?.toFixed(2)}/5.00{" "}
          <Entypo name="star" size={20} color={"#fdd835"} />
        </Text>
      </View>
    </View>
  );
};

export default PlanOrganizer;
