import EventResponse from "@/interfaces/responses/Event";
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { ImageContainer } from "./ImageContainer";
import BackArrow from "./BackArrow";
import ForwardArrow from "./ForwardArrow";

interface ISwiperProps {
  events: EventResponse[];
  onPress: (event: EventResponse) => void;
}

const width = Dimensions.get("window").width;

let itemWidth: number;
if (width <= 768) itemWidth = width;
else if (width > 768 && width <= 1024) itemWidth = width / 3;
else itemWidth = width / 4;

export function SwiperComponent({ events, onPress }: ISwiperProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const snapToPrev = () => {
    const next = Math.max(currentIndex - 1, 0);
    setCurrentIndex(next);
    scrollRef.current?.scrollTo({ x: next * itemWidth, animated: true });
  };

  const snapToNext = () => {
    const next = Math.min(currentIndex + 1, events.length - 1);
    setCurrentIndex(next);
    scrollRef.current?.scrollTo({ x: next * itemWidth, animated: true });
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={snapToPrev} />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scroll}
      >
        {events.map((event) => (
          <View key={event._id} style={{ width: itemWidth }}>
            <ImageContainer event={event} onPress={() => onPress(event)} />
          </View>
        ))}
      </ScrollView>
      <ForwardArrow onPress={snapToNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
  },
});
