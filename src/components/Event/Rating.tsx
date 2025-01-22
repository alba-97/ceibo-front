import { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import rateEvent from "@/api/rateEvent";
import { View, Text, StyleSheet } from "react-native";
import EventResponse from "@/interfaces/responses/Event";
import getRating from "@/api/getRating";
import handleError from "@/utils/handleError";
import { toast } from "react-toastify";

interface IRatingProps {
  event: EventResponse;
}

export default ({ event }: IRatingProps) => {
  const [rating, setRating] = useState<number>();

  const fetchRating = async () => {
    try {
      const { rating } = await getRating(event._id);
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
    if (!event._id) return;
    const userRating = await fetchRating();
    if (!userRating) return;
    try {
      await rateEvent(rating, event._id);
      setRating(rating);
      toast.success("Event rated successfully");
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

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    color: "#fff",
  },
});
