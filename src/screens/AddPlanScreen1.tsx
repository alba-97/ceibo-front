import { LinearGradient } from "expo-linear-gradient";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import GenericButton from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import * as ImagePicker from "expo-image-picker";
import { DatePicker } from "../components/DatePicker";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { ProfileText } from "../components/ProfileText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function AddPlanScreen1() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setstart_date] = useState<Date>(new Date());
  const [path, setPath] = useState(
    "https://cdn.discordapp.com/attachments/1105565124825186415/1113122954897801406/El_club_del_plan.png"
  );

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.assets && result.assets[0]) {
        setPath(result.assets[0].uri);
      }
    } catch {}
  };

  useEffect(() => {
    setstart_date(start_date);
  }, [start_date]);

  const handleContinue = () => {
    const eventDate = start_date.toISOString();

    navigation.navigate("AddPlanScreen2", {
      title,
      description,
      location,
      start_date: eventDate,
      path,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <ScrollView>
          <ProfileText text="Crear Plan" />
          <View style={[styles.content, { paddingTop: "5%" }]}>
            <Text style={styles.text}>Título</Text>
            <GenericInput value={title} onChangeText={setTitle} />
            <Text style={styles.text}>Descripción</Text>
            <GenericInput value={description} onChangeText={setDescription} />
            <Text style={styles.text}>Lugar</Text>
            <GenericInput value={location} onChangeText={setLocation} />
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Fecha</Text>
                <DatePicker
                  type="date"
                  value={start_date}
                  onChange={(date) => setstart_date(new Date(date))}
                  placeholder="DD/MM/YYYY"
                />
              </View>
            </View>
            <Text style={styles.text}>Imagen</Text>
            <TouchableOpacity
              style={[styles.container, { padding: "5%" }]}
              onPress={selectImage}
            >
              <Image
                source={{
                  uri: path,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.crearPlan}>
              <GenericButton onPress={handleContinue} text={"Continuar"} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}