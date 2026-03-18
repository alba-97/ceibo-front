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
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    getRating(event._id)
      .then(({ rating }) => setRating(rating ?? 0))
      .catch(handleError);
  }, []);

  const handleRating = async (newRating: number) => {
    if (!event._id) return;
    try {
      await rateEvent(newRating, event._id);
      setRating(newRating);
      toast.success("Event rated successfully");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <View style={styles.input}>
      <Text style={styles.text}>Your rating:</Text>
      <StarRating rating={rating} onChange={handleRating} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    flexDirection: "row",
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    color: "#fff",
    marginTop: 2,
  },
});
