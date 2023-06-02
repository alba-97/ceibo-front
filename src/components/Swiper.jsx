import Swiper from "react-native-swiper";
import { ImageContainer } from "./ImageContainer";
import { View } from "react-native";
import ProfileText from "../components/ProfileText";
import styles from "../styles/swiperStyles";

export function SwiperComponent({ title, plans }) {
  return (
    <>
      <ProfileText text={title}></ProfileText>
      <Swiper showsPagination={false} height={200}>
        {plans.map((p) => {
          return (
            <View style={styles.view}>
              <ImageContainer
                imageSource={p?.img}
                date={p?.event_date}
                event={p?.description}
              />
            </View>
          );
        })}
      </Swiper>
    </>
  );
}
