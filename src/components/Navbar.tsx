import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

export const Navbar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("home")}
    >
      <Text style={styles.title}>The Event Network</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: Platform.OS !== "web" ? 40 : 20,
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontFamily: "Melts",
    fontSize: 40,
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
  },
});
