import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";

export const Navbar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  if (isDesktop) return null;

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
    paddingBottom: 16,
    paddingTop: Platform.OS !== "web" ? 44 : 20,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    borderBottomColor: "#2A2A2A",
    borderBottomWidth: 1,
    width: "100%",
    backgroundColor: "#121212",
  },
  title: {
    fontWeight: "800",
    fontSize: 22,
    color: "#F0F0F0",
    letterSpacing: -0.5,
  },
});
