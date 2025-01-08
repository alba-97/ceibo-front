import { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import GenericButton from "../GenericButton";
import enrollUser from "../../api/enrollUser";
import { useDispatch } from "react-redux";
import discardUser from "../../api/discardUser";
import fecha from "../../assets/fecha.png";
import EventResponse from "@/interfaces/responses/Event";
import UserResponse from "@/interfaces/responses/User";
import { removeUserPlan } from "@/state/user";
import handleError from "@/utils/handleError";
import formatDate from "@/utils/formatDate";

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
    try {
      await enrollUser(plan._id);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleStopParticipating = async () => {
    if (!plan._id) return;
    setLoading(true);
    try {
      await discardUser(plan._id);
      dispatch(removeUserPlan(plan._id));
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Image style={styles.dateLogo} source={fecha} />
        <Text style={styles.text}>{formatDate(plan.start_date)}</Text>
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
                  customStyle={styles.button}
                />
              ) : (
                <GenericButton text={"..."} customStyle={styles.button} />
              )}
            </View>
          ) : (
            <View>
              {!loading ? (
                <GenericButton
                  text={"x"}
                  customStyle={styles.button}
                  onPress={handleStopParticipating}
                />
              ) : (
                <GenericButton text={"..."} customStyle={styles.button} />
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 100 },
  date: { flexDirection: "row" },
  dateLogo: {
    width: 80,
    height: 20,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    color: "#fff",
  },
  buttonContainer: {
    top: -12,
  },
  button: {
    width: 60,
    height: 45,
    borderRadius: 5,
  },
});

export default PlanEnroll;
