import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import { Navbar } from "@/components/Navbar";
import MultipleDropdown from "@/components/MultipleDropdown";
import getCategories from "@/api/getCategories";
import addPreferences from "@/api/addPreferences";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import fromResponsesToOptionSelect from "@/utils/category/fromResponsesToOptionSelect";
import handleError from "@/utils/handleError";
import { setRefetch } from "@/state/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import AppGradient from "@/components/AppGradient";
import IOptionSelect from "@/interfaces/OptionSelect";

export default function PreferencesScreen() {
  const user = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState<string[]>(
    user.preferences?.map((p) => p._id) ?? []
  );
  const [categories, setCategories] = useState<IOptionSelect[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { refetch } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(fromResponsesToOptionSelect(data));
  };

  useEffect(() => {
    fetchCategories();
  }, [refetch]);

  const handleSubmit = async () => {
    try {
      await addPreferences(selected);
      dispatch(setRefetch());
      navigation.navigate("home");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.container}>
      <Navbar />
      <ScrollView style={styles.scroll}>
        <Text style={styles.subtitle}>
          We will show events that match your preferences
        </Text>
        <View style={styles.container}>
          <MultipleDropdown
            data={categories}
            selectedValues={selected}
            onSelect={(selectedValues: string[]) => {
              setSelected(selectedValues);
            }}
          />
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.logoText}>Update Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    color: "white",
    backgroundColor: "rgba(225, 200, 200, 0.2)",
    maxWidth: "80%",
  },
  badge: {
    backgroundColor: "rgba(25, 20, 20, 0.3)",
  },
  scroll: {
    flex: 1,
    width: "100%",
    paddingTop: "10%",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  logoText: {
    color: "#F0F0F0",
    fontWeight: "700",
    fontSize: 18,
  },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 35,
  },
  logoutContainer: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "65%",
    backgroundColor: "#2D2D2D",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
});
