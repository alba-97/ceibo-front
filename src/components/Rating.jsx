import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";
import { rateEvent } from "../services/rateEvent";
import { View, Text, Alert } from "react-native";
import { styles } from "../styles/PlanDetails";

const Rating = ({ plan }) => {
  const [rating, setRating] = useState(0);

  const handleRating = async () => {
    const data = await rateEvent(rating, plan._id);
    Alert.alert("Exito", data.message);
  };

  return (
    <View style={styles.input}>
      <Text style={styles.text}>Organizador: {plan?.organizer?.username}</Text>

      <Text style={styles.p}>
        {plan?.organizer?.rating?.toFixed(2)}/5.00{" "}
        <Entypo name="star" size={20} color={"#fdd835"} />
      </Text>
      <Text style={styles.text}>
        <StarRating
          rating={rating}
          onChange={setRating}
          onRatingEnd={handleRating}
        />
      </Text>
    </View>
  );
};

export default Rating;
