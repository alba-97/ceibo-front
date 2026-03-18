import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NAV_ITEMS = [
  {
    label: "Home",
    route: "home",
    icon: (color: string) => <Entypo name="home" size={24} color={color} />,
    authRequired: false,
  },
  {
    label: "Search",
    route: "search",
    icon: (color: string) => <Feather name="search" size={24} color={color} />,
    authRequired: false,
  },
  {
    label: "Add Event",
    route: "add-event",
    icon: (color: string) => (
      <MaterialIcons name="add-to-photos" size={24} color={color} />
    ),
    authRequired: false,
  },
];

export default function SideNavbar() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const userId = useSelector((state: RootState) => state.user._id);
  const isLoggedIn = !!userId;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Text style={styles.logo}>The Event Network</Text>
      </TouchableOpacity>
      <View style={styles.items}>
        {NAV_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={styles.item}
            onPress={() => navigation.navigate(item.route)}
          >
            {item.icon("#fff")}
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(isLoggedIn ? "profile" : "login")}
        >
          <FontAwesome name="user-circle-o" size={24} color="#fff" />
          <Text style={styles.label}>{isLoggedIn ? "Profile" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: "#111",
    borderRightWidth: 1,
    borderRightColor: "#222",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  logo: {
    color: "#F0F0F0",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  items: {
    gap: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    cursor: "pointer",
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
});
