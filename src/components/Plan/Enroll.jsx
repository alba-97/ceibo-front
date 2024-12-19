import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import GenericButton from "../GenericButton";
import { styles } from "../../styles/PlanDetails";
import { enrollUser } from "../../services/enrollUser";
import { useDispatch } from "react-redux";
import { discardUser } from "../../services/discardUser";
import fecha from "../../assets/fecha.png";

const PlanEnroll = ({ plan, user }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formattingDate = plan?.start_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const handleEnroll = async () => {
    setLoading(true);
    await enrollUser(plan._id, dispatch);
    setLoading(false);
  };

  const handleStopParticipating = async () => {
    setLoading(true);
    await discardUser(plan._id, dispatch);
    setLoading(false);
  };

  return (
    <View style={{ flexDirection: "row", gap: 100 }}>
      <View style={styles.date}>
        <Image style={styles.logo} source={fecha} />
        <Text style={styles.text2}>{formattingDate}</Text>
      </View>
      {user._id && plan._id && (
        <View style={styles.buttonContainer}>
          {!user.plans?.some((userPlan) => userPlan._id === plan._id) ? (
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
