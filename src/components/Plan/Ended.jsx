import React from "react";
import { View, Text } from "react-native";
import Rating from "./Rating";
import { styles } from "../../styles/PlanDetails";

const PlanEnded = ({ plan, user }) => {
  const formattingDate = plan?.start_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  return (
    <View>
      <Text style={styles.subtitle}>
        El evento finalizó el {formattingDate}
      </Text>

      {user._id &&
        user.history &&
        user.history.some((item) => item._id == plan._id) &&
        plan.organizer?._id !== user._id &&
        plan.ended && <Rating plan={plan} />}
    </View>
  );
};

export default PlanEnded;
