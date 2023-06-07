// Native
import { ImageContainer } from "./ImageContainer";
import Swiper from "react-native-swiper";
import { View } from "react-native";
// Components
import { ProfileText } from "../components/ProfileText";
import styles from "../styles/swiperStyles";

export function SwiperComponent({ title, plans, onPress }) {
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
              <ImageContainer plan={p} onPress={onPress} />
            </View>
          );
        })}
      </Swiper>
    </>
  );
}
