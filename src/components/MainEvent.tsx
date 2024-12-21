import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles/mainEvent";
import { formatDate } from "../utils/fromDateToDateDescription";
import { EventResponse } from "@/interfaces/responses/Event";

interface IMainEventProps {
  plan: EventResponse;
  onPress: (plan: EventResponse) => void;
}

export const MainEvent = ({ plan, onPress }: IMainEventProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(plan)}>
      <View>
        <Image source={{ uri: plan?.img }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text}>{plan?.title}</Text>
          <Text style={styles.subtitle}>
            {plan?.start_date && formatDate(plan?.start_date)}
          </Text>
          <Text style={styles.subtitle}>{plan?.category?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
