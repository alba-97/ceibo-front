import { ImageContainer } from "./ImageContainer";
import EventResponse from "@/interfaces/responses/Event";
import AppScrollView from "./AppScrollView";
import { StyleSheet } from "react-native";
import { useState } from "react";

interface ISwiperProps {
  events: EventResponse[];
  onPress: (event: EventResponse) => void;
}

export function SwiperComponent({ events, onPress }: ISwiperProps) {
  const [isStill, setIsStill] = useState(false);

  return (
    <AppScrollView
      style={styles.scrollView}
      horizontal={true}
      setIsStill={setIsStill}
    >
      {events.map((item: EventResponse) => {
        return (
          <ImageContainer
            event={item}
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
  scrollView: {
    flex: 1,
    width: "100%",
  },
});
