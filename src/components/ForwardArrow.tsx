import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default ({ onPress }: { onPress: () => void }) => {
  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: "row", padding: 10 }}
        onPress={onPress}
      >
        <Feather name="arrow-right" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};
