import Swiper from "react-native-swiper";
import { ImageContainer } from "./ImageContainer";
import { Text, View } from "react-native";

import styles from "../styles/swiperStyles";

export function SwiperComponent({ title, plans, onPress}) {
  const handlePress = (event) => {
    // Invocar la función onPress pasada desde el componente padre
    if (onPress) {
      onPress(event);
    }
  };

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
