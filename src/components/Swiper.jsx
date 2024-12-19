import { ImageContainer } from "./ImageContainer";
import { styles } from "../styles/swiperStyles";
import React from "react";
import { View, FlatList, Image } from "react-native";

export function SwiperComponent({ plans, onPress, image, styleLogo }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Image style={styleLogo} source={image} />
      </View>
      <FlatList
        data={plans}
        renderItem={({ item }) => {
          return (
            <View style={styles.view}>
              <ImageContainer plan={item} onPress={() => onPress(item)} />
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        ItemSeparatorComponent={<View style={{ margin: 10 }}></View>}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
