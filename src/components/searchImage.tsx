import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fromDateToDateDescription from "../utils/fromDateToDateDescription";
import EventResponse from "@/interfaces/responses/Event";

interface ISearchImgProps {
  plan: EventResponse;
  onPress: (plan: EventResponse) => void;
}

export const SearchImg = ({ plan, onPress }: ISearchImgProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onPress(plan)}>
        <Image source={{ uri: plan?.img }} style={styles.image} />
        <Text style={styles.bannerText}>{plan?.title}</Text>
        <Text style={styles.bannerTextDate}>
          {plan?.start_date && fromDateToDateDescription(plan?.start_date)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: 500,
    height: 100,
    margin: 5,
    left: 50,
  },
  bannerText: {
    width: 250,
    top: -100,
    left: 110,
    color: "#FFF",
    fontSize: 20,
  },
  bannerTextDate: {
    left: 110,
    top: -100,
    color: "#FFF",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});
