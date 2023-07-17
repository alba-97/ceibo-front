import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView, Text, Image } from "react-native";
import { useSelector } from "react-redux";

import Comments from "../components/Plan/Comments";
import PlanOrganizer from "../components/Plan/Organizer";
import PlanEnded from "../components/Plan/Ended";
import PlanInvite from "../components/Plan/Invite";
import PlanEnroll from "../components/Plan/Enroll";
import PlanEdit from "../components/Plan/Edit";

import { styles } from "../styles/PlanDetails";

import descripcion from "../assets/descripcion.png";
import { Navbar } from "../components/Navbar";

export default function PlanDetailScreen() {
  const plan = useSelector((state) => state.selectedPlan);
  const user = useSelector((state) => state.user);

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
    >
      <Navbar />
      <ScrollView>
        <View>
          <Text style={styles.title}>{plan?.title}</Text>
          <Image
            source={{ uri: plan?.img }}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            {plan.ended ? (
              <PlanEnded plan={plan} user={user} />
            ) : (
              <PlanEnroll plan={plan} user={user} />
            )}
          </View>

          <PlanOrganizer plan={plan} />

          <Image style={styles.logo3} source={descripcion} />
          <Text style={styles.text3}>{plan.description}</Text>
          {user._id && (
            <View>
              <Comments plan={plan} />
              <PlanEdit plan={plan} />
              <PlanInvite plan={plan} />
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
