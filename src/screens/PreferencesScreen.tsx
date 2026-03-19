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
import { T } from "@/theme";

export default function PreferencesScreen() {
  const user = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState<string[]>(
    user.preferences?.map((p) => p._id) ?? [],
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
    <AppGradient style={styles.root}>
      <Navbar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Personalize</Text>
          <Text style={styles.title}>Preferences</Text>
          <View style={styles.accentLine} />
          <Text style={styles.subtitle}>
            We'll surface events that match your interests
          </Text>
        </View>

        <View style={styles.controlsBlock}>
          <MultipleDropdown
            data={categories}
            selectedValues={selected}
            onSelect={(selectedValues: string[]) => setSelected(selectedValues)}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 28,
    marginBottom: 28,
  },
  eyebrow: {
    color: T.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: T.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: T.accent,
    borderRadius: 2,
    marginBottom: 14,
  },
  subtitle: {
    color: T.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  controlsBlock: {
    width: "45%",
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: T.accent,
    borderRadius: T.radius.md,
    paddingVertical: 16,
    paddingHorizontal: 0,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: T.bg,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
