import { Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { ImageContainer } from "./ImageContainer";

export function ContactSwiper({ title, plans, onPress }) {
  const handlePress = (event) => {
    //Invocar la función onPress pasada desde el componente padre
    if (onPress) {
      onPress(event);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Swiper
        loop={false}
        showsPagination={false}
        containerStyle={styles.swiperContainer}
      >
        {plans.map((p, index) => {
          return (
            <View style={styles.view} key={index}>
              <ImageContainer
                plan={p}
                onPress={() => handlePress(p)} // Agrega el evento onPress aquí
              />
            </View>
          );
        })}
      </Swiper>
    </>
  );
}
