import { View, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import organizador from "../../assets/organizador.png";
import EventResponse from "@/interfaces/responses/Event";

interface IPlanOrganizerProps {
  plan: EventResponse;
  rating?: number;
}

const PlanOrganizer = ({ plan, rating }: IPlanOrganizerProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.organizerLogo} source={organizador} />
      </View>
      <View style={styles.container}>
        <Text style={styles.p}>{plan?.createdBy?.username}</Text>
        <Text style={styles.p}>
          {rating && (
            <>
              {rating.toFixed(2)}/5.00
              <Entypo name="star" size={20} color={"#fdd835"} />
            </>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  organizerLogo: {
    width: 140,
    height: 30,
    marginTop: 10,
  },
  p: {
    fontSize: 18,
    color: "#fff",
    paddingRight: 40,
  },
});

export default PlanOrganizer;
