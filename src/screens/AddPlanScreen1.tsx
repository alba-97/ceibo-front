import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  GestureResponderEvent,
} from "react-native";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { ProfileText } from "../components/ProfileText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { GenericInput } from "@/components/GenericInput";
import EventForm from "@/interfaces/forms/Event";
import DatetimePicker from "@/components/DatetimePicker";
import UploadFile from "@/components/UploadFile";

export default function AddPlanScreen1() {
  const initialValues: EventForm = {
    title: "",
    description: "",
    location: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    img: "",
    min_age: null,
    max_age: null,
    min_to_pay: null,
    total_to_pay: null,
    category: "Default",
    link_to_pay: "",
    private: false,
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, values, setFieldValue }) => (
            <View>
              <ScrollView>
                <ProfileText text="Crear Plan" />

                <View style={[styles.content, { paddingTop: "5%" }]}>
                  <Text style={styles.text}>Título</Text>

                  <GenericInput
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />

                  <Text style={styles.text}>Descripción</Text>

                  <GenericInput
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                  />

                  <View style={styles.container2}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Lugar</Text>
                      <GenericInput
                        onChangeText={handleChange("location")}
                        onBlur={handleBlur("location")}
                        value={values.location}
                      />
                    </View>
                  </View>

                  <View style={styles.container2}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Fecha de inicio</Text>
                      <DatetimePicker
                        date={values.start_date}
                        onChange={(date: string) =>
                          setFieldValue("start_date", date)
                        }
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Fecha de finalización</Text>
                      <DatetimePicker
                        date={values.end_date}
                        onChange={(date: string) =>
                          setFieldValue("end_date", date)
                        }
                      />
                    </View>
                  </View>
                  <Text style={styles.text}>Imagen</Text>

                  <UploadFile
                    onChange={(url: string) => {
                      setFieldValue("img", url);
                    }}
                  />

                  <TouchableOpacity
                    style={[styles.container, { padding: "5%" }]}
                    onPress={(img: GestureResponderEvent) =>
                      setFieldValue("img", img)
                    }
                  >
                    {values.img !== "" && (
                      <Image
                        source={{
                          uri: values.img,
                        }}
                        style={styles.image}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={styles.crearPlan}>
                    <Button
                      onPress={(_: GestureResponderEvent) => {
                        if (values.start_date)
                          values.start_date = values.start_date;
                        navigation.navigate("AddPlanScreen2", values);
                      }}
                      title="Next"
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </Formik>

        <Navbar />
      </LinearGradient>
    </View>
  );
}
