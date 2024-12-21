import { useState } from "react";
import { View, Image, Text } from "react-native";
import GenericButton from "../GenericButton";
import { styles } from "../../styles/PlanDetails";
import { enrollUser } from "../../api/enrollUser";
import { useDispatch } from "react-redux";
import { discardUser } from "../../api/discardUser";
import fecha from "../../assets/fecha.png";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";

interface IPlanEnrollProps {
  plan: EventResponse;
  user: UserResponse;
}

const PlanEnroll = ({ plan, user }: IPlanEnrollProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEnroll = async () => {
    if (!plan._id) return;
    setLoading(true);
    await enrollUser(plan._id, dispatch);
    setLoading(false);
  };

  const handleStopParticipating = async () => {
    if (!plan._id) return;
    setLoading(true);
    await discardUser(plan._id, dispatch);
    setLoading(false);
  };

  return (
    <View style={{ flexDirection: "row", gap: 100 }}>
      <View style={styles.date}>
        <Image style={styles.logo} source={fecha} />
        <Text style={styles.text2}>{plan?.start_date}</Text>
      </View>
      {user._id && plan._id && (
        <View style={styles.buttonContainer}>
          {!user.plans?.some(
            (userPlan: EventResponse) => userPlan._id === plan._id
          ) ? (
            <View>
              {!loading ? (
                <GenericButton
                  text={"+"}
                  onPress={handleEnroll}
                  customStyle={styles.btn}
                />
              ) : (
                <GenericButton text={"..."} customStyle={styles.btn} />
              )}
            </View>
          ) : (
            <View>
              {!loading ? (
                <GenericButton
                  text={"x"}
                  customStyle={styles.btn}
                  onPress={handleStopParticipating}
                />
              ) : (
                <GenericButton text={"..."} customStyle={styles.btn} />
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default PlanEnroll;
