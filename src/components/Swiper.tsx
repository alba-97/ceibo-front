import { ImageContainer } from "./ImageContainer";
import EventResponse from "@/interfaces/responses/Event";
import AppScrollView from "./AppScrollView";
import { StyleSheet } from "react-native";
import { useState } from "react";

interface ISwiperProps {
  plans: EventResponse[];
  onPress: (plan: EventResponse) => void;
}

export function SwiperComponent({ plans, onPress }: ISwiperProps) {
  const [isStill, setIsStill] = useState(false);

  return (
    <AppScrollView
      style={styles.scrollView}
      horizontal={true}
      setIsStill={setIsStill}
    >
      {plans.map((item: EventResponse) => {
        return (
          <ImageContainer
            plan={item}
            onPress={() => {
              isStill && onPress(item);
            }}
            key={item._id}
          />
        );
      })}
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
  },
  scrollView: {
    width: "100%",
  },
});
