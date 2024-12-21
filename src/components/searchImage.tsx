import { Image, Text, TouchableOpacity } from "react-native";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
import styles from "../styles/searchImageStyle";
import EventResponse from "@/interfaces/responses/Event";

interface ISearchImgProps {
  plan: EventResponse;
  onPress: (plan: EventResponse) => void;
}

export const SearchImg = ({ plan, onPress }: ISearchImgProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(plan)}>
      <Image source={{ uri: plan?.img }} style={styles.image} />

      <Text style={styles.text}>{plan?.title}</Text>
      <Text style={styles.textFecha}>
        {plan?.start_date && fromDateToDateDescription(plan?.start_date)}
      </Text>
    </TouchableOpacity>
  );
};
