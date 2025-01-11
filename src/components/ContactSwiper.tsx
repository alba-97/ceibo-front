import EventResponse from "@/interfaces/responses/Event";
import { ImageContainer } from "./ImageContainer";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

interface IContactSwiperProps {
  title: string;
  plans: EventResponse[];
  onPress?: (event: EventResponse) => void;
}

export function ContactSwiper({ title, plans, onPress }: IContactSwiperProps) {
  const handlePress = (event: EventResponse) => {
    if (onPress) onPress(event);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Swiper
        loop={false}
        showsPagination={false}
        containerStyle={styles.swiperContainer}
      >
        {plans.map((p, index) => {
          return (
            <View style={styles.imageContainer} key={index}>
              <ImageContainer plan={p} onPress={handlePress} />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderStyle: "solid",
    alignItems: "center",
  },
  container: {
    marginTop: 3,
  },
  swiperContainer: {
    height: 155,
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "10%",
    marginBottom: 23,
  },
  logoutContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
