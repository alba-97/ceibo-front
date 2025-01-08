import { Text, Image, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Comments from "../components/Plan/Comments";
import PlanOrganizer from "../components/Plan/Organizer";
import PlanEnded from "../components/Plan/Ended";
import PlanInvite from "../components/Plan/Invite";
import PlanEnroll from "../components/Plan/Enroll";
import PlanEdit from "../components/Plan/Edit";
import descripcion from "../assets/descripcion.png";
import { Navbar } from "../components/Navbar";
import { RootState } from "@/state/store";
import AppScrollView from "@/components/AppScrollView";
import AppGradient from "@/components/AppGradient";
import { useEffect, useState } from "react";
import getRating from "@/api/getRating";

export default function PlanDetailScreen() {
  const plan = useSelector((state: RootState) => state.selectedPlan);
  const user = useSelector((state: RootState) => state.user);
  const [rating, setRating] = useState<number>();

  const fetchRating = async () => {
    const { rating } = await getRating(plan._id);
    setRating(rating);
  };

  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <AppGradient style={styles.gradient}>
      <Navbar />
      <AppScrollView>
        <View>
          <Text style={styles.title}>{plan?.title}</Text>
          <Image source={{ uri: plan?.img }} style={styles.eventImage} />
        </View>
        <View style={styles.eventContainer}>
          <View>
            {plan.ended ? (
              <PlanEnded plan={plan} user={user} />
            ) : (
              <PlanEnroll plan={plan} user={user} />
            )}
          </View>

          <PlanOrganizer plan={plan} rating={rating} />

          <Image style={styles.descriptionLogo} source={descripcion} />
          <Text style={styles.description}>{plan.description}</Text>
          {user._id && (
            <View>
              <Comments plan={plan} />
              <PlanEdit plan={plan} />
              <PlanInvite plan={plan} />
            </View>
          )}
        </View>
      </AppScrollView>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    color: "#fff",
  },
  eventContainer: {
    justifyContent: "center",
    marginTop: 5,
    padding: 20,
  },
  descriptionLogo: {
    width: 130,
    height: 26,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: "#fff",
  },
  eventImage: {
    width: "100%",
    height: 200,
  },
});
