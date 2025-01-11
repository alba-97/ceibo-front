import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const FloatingButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("AddContact");
      }}
    >
      <Octicons name="person-add" size={35} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#22001b",
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
