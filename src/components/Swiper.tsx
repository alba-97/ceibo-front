import { ImageContainer } from "./ImageContainer";
import { styles } from "../styles/swiperStyles";
import {
  View,
  FlatList,
  Image,
  ImageStyle,
  StyleProp,
  ImageSourcePropType,
} from "react-native";
import EventResponse from "@/interfaces/responses/Event";
import Separator from "./Separator";

interface ISwiperProps {
  plans: EventResponse[];
  onPress: (plan: EventResponse) => void;
  image: ImageSourcePropType;
  styleLogo: StyleProp<ImageStyle>;
}

export function SwiperComponent({
  plans,
  onPress,
  image,
  styleLogo,
}: ISwiperProps) {
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
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
