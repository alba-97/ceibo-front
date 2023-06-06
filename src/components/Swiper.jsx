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
      <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
     </View>


      <Swiper loop={false} showsPagination={false}   containerStyle={styles.swiperContainer}>
        {plans.map((p, index) => {
          return (
            <View style={styles.view} key={index}>
              <ImageContainer
                imageSource={p?.img}
                date={p?.event_date}
                event={p?.title}
                onPress={() => handlePress(p)} // Agrega el evento onPress aquí
              />
            </View>
          );
        })}
      </Swiper>
    </>
  );
}
