import { View, Text } from "react-native";
import Rating from "./Rating";
import { styles } from "../../styles/PlanDetails";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import fromDateToDateDescription from "@/utils/fromDateToDateDescription";

interface IPlanEndedProps {
  plan: EventResponse;
  user: UserResponse;
}

const PlanEnded = ({ plan, user }: IPlanEndedProps) => {
  const formattingDate = fromDateToDateDescription(plan?.end_date);
  const time = plan?.end_date.split("T")[1].slice(0, 5);

  return (
    <View>
      <Text style={styles.subtitle}>
        El evento finalizó el {formattingDate} a a las {time} hs.
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
