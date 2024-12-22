import { styles } from "../styles/floatingButtonStyles";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const FloatingButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => {
        navigation.navigate("AddContact");
      }}
    >
      <Octicons name="person-add" size={35} color="white" />
    </TouchableOpacity>
  );
};
