// Native
import { ImageContainer } from "./ImageContainer";
// Components
import { styles } from "../styles/swiperStyles";
import React from "react";
import { View, FlatList, Text } from "react-native";
export function SwiperComponent({ plans, text, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <FlatList
        data={plans}
        renderItem={({ item }) => {
          return (
            <View style={styles.view}>
              <ImageContainer plan={item} onPress={() => onPress(item)} />
            </View>
          );
        }}
        horizontal={true}
        ItemSeparatorComponent={<View style={{ margin: 10 }}></View>}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
