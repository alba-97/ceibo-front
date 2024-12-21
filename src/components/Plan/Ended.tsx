import { View, Text } from "react-native";
import Rating from "./Rating";
import { styles } from "../../styles/PlanDetails";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";

interface IPlanEndedProps {
  plan: EventResponse;
  user: UserResponse;
}

const PlanEnded = ({ plan, user }: IPlanEndedProps) => {
  const formattingDate = plan?.start_date;

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
