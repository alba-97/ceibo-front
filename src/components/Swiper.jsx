import Swiper from "react-native-swiper";
import { ImageContainer } from "./ImageContainer";
import { View } from "react-native";
import ProfileText from "../components/ProfileText";
import styles from "../styles/swiperStyles";

export function SwiperComponent({ title, plans }) {
  return (
    <>
      <ProfileText text={title}></ProfileText>
      <Swiper
        loop={false}
        showsButtons={true}
        showsPagination={false}
        height={200}
      >
        {plans.map((p, index) => {
          return (
            <View style={styles.view} key={index}>
              <ImageContainer plan={p} />
            </View>
          );
        })}
      </Swiper>
    </>
  );
}
