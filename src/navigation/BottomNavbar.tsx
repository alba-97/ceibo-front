import getEvent from "@/api/getEvent";
import { setAuthor, setSelectedEvent } from "@/state/selectedEvent";
import handleError from "@/utils/handleError";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleDeepLink = async (event: { url: string }) => {
    const { url } = event;
    const urlParts = url.split("//");
    if (urlParts.length !== 2) return;

    const [scheme, route] = urlParts;
    if (!(scheme === "theeventnetwork:" && route)) return;

    try {
      const updatedEvent = await getEvent(route);
      dispatch(setSelectedEvent(updatedEvent));
      dispatch(setAuthor(updatedEvent.createdBy));
      navigation.navigate("event-detail");
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const handleUrlChange = (event: { url: string }) => {
      handleDeepLink(event);
    };
    const subscription = Linking.addEventListener("url", handleUrlChange);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("home")}
      >
        <Entypo name="home" size={30} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("search")}
      >
        <Feather name="search" size={30} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("add-event")}
      >
        <MaterialIcons name="add-to-photos" size={30} color={"#fff"} />
      </TouchableOpacity>
      {Platform.OS !== "web" && (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("AddContactScreen")}
        >
          <AntDesign name="contacts" size={30} color={"#fff"} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("profile")}
      >
        <FontAwesome name="user-circle-o" size={30} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
});
