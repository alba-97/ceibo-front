// Native
import Swiper from "react-native-swiper";
import { ImageContainer } from "./ImageContainer";
import { View } from "react-native";
// Components
import { ProfileText } from "../components/ProfileText";
// Styles
import styles from "../styles/swiperStyles";

export function SwiperComponent({ title, plans }) {
  console.log("plans", plans);
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
