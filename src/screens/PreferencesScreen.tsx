import { useState, useEffect } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/preferencesStyles";
import { Navbar } from "@/components/Navbar";
import MultipleDropdown from "@/components/MultipleDropdown";
import getCategories from "@/api/getCategories";
import addPreferences from "@/api/addPreferences";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import actualizar from "@/assets/actualizar.png";
import editUser from "@/api/editUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IOption from "@/interfaces/Option";
import fromCategoryResponsesToOptions from "@/utils/category/fromCategoryResponsesToOptions";
import handleError from "@/utils/handleError";
import { setRefetch } from "@/state/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function PreferencesScreen() {
  const [selected, setSelected] = useState<IOption[]>([]);
  const [categories, setCategories] = useState<IOption[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { refetch } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(fromCategoryResponsesToOptions(data));
  };

  useEffect(() => {
    fetchCategories();
  }, [refetch]);

  const handleSubmit = async () => {
    try {
      await addPreferences([{ name: selected[0].value }]);
      dispatch(setRefetch());
      editUser({ new_user: false });
      navigation.navigate("HomeScreen");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <ScrollView style={styles.scroll}>
        <Text style={styles.subtitle}>
          Mostraremos eventos que sean acordes a tus preferencias
        </Text>
        <View style={styles.container}>
          <MultipleDropdown
            setSelected={(val) => setSelected(val)}
            data={categories}
            save="value"
            onSelect={() => {}}
            label="Preferencias"
            placeholder="Preferencias"
            search={false}
            textStyles={styles.text}
            boxStyles={styles.inputContainer}
            dropdownStyles={styles.inputContainer}
            badgeStyles={styles.badge}
          />

          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleSubmit}>
              <Image style={styles.logo} source={actualizar} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
