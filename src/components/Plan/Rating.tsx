import { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import rateEvent from "@/api/rateEvent";
import { View, Text, Alert } from "react-native";
import { styles } from "@/styles/PlanDetails";
import EventResponse from "@/interfaces/responses/Event";
import getRating from "@/api/getRating";
import handleError from "@/utils/handleError";

interface IRatingProps {
  plan: EventResponse;
}

const Rating = ({ plan }: IRatingProps) => {
  const [rating, setRating] = useState<number>();

  const fetchRating = async () => {
    try {
      const { rating } = await getRating(plan._id);
      setRating(rating);
      return rating;
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const handleRating = async (rating: number) => {
    if (!plan._id) return;
    const userRating = await fetchRating();
    if (!userRating) return;
    try {
      const data = await rateEvent(rating, plan._id);
      setRating(rating);
      Alert.alert("Exito", data.message);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <View style={styles.input}>
      <Text style={styles.text}>Tu calificación:</Text>
      <Text style={styles.text}>
        {rating && <StarRating rating={rating} onChange={handleRating} />}
      </Text>
    </View>
  );
};

export default Rating;
