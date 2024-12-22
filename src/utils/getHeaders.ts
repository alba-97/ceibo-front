import AsyncStorage from "@react-native-async-storage/async-storage";

export default async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("You need to be logged in to continue");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
