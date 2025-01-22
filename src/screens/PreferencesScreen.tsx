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
  const [selected, setSelected] = useState<IOptionSelect[]>([]);
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
      const categoryIds = selected.map((c) => c.id);
      await addPreferences(categoryIds);
      dispatch(setRefetch());
      navigation.navigate("HomeScreen");
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
            onSelect={(selectedValues) => {
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
    fontFamily: "Melts",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
    marginBottom: 20,
    marginTop: 30,
    fontSize: 40,
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
    paddingTop: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    width: "65%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
