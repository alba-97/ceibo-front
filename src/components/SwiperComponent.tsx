import EventResponse from "@/interfaces/responses/Event";
import { Dimensions, ListRenderItemInfo, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { ImageContainer } from "./ImageContainer";
import BackArrow from "./BackArrow";
import { useRef } from "react";
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
  const ref = useRef<Carousel<EventResponse>>(null);
  return (
    <View style={styles.container}>
      <BackArrow onPress={() => ref.current?.snapToPrev()} />
      <Carousel
        ref={ref}
        data={events}
        contentContainerCustomStyle={{
          paddingLeft: 0,
        }}
        firstItem={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        renderItem={({ item }: ListRenderItemInfo<EventResponse>) => (
          <ImageContainer
            event={item}
            onPress={() => {
              onPress(item);
            }}
            key={item._id}
          />
        )}
        sliderWidth={width - 128}
        itemWidth={itemWidth}
      />
      <ForwardArrow onPress={() => ref.current?.snapToNext()} />
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
});
