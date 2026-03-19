import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { T } from "@/theme";

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
      <View style={styles.accentBar} />
      <Text style={styles.title}>THE EVENT NETWORK</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 14,
    paddingTop: Platform.OS !== "web" ? 48 : 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: T.border,
    borderBottomWidth: 1,
    width: "100%",
    backgroundColor: T.bg,
    gap: 10,
  },
  accentBar: {
    width: 3,
    height: 18,
    backgroundColor: T.accent,
    borderRadius: 2,
  },
  title: {
    fontWeight: "800",
    fontSize: 14,
    color: T.text,
    letterSpacing: 2.5,
  },
});
