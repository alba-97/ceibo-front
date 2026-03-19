import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";
import { clearUser, updateUser } from "../state/user";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { RootState } from "@/state/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import AppGradient from "@/components/AppGradient";
import { Formik } from "formik";
import RegisterSchema from "@/utils/schema/RegisterSchema";
import InteractiveProfilePicture from "@/components/InteractiveProfilePicture";
import UserForm from "@/interfaces/forms/User";
import fromResponseToForm from "@/utils/user/fromResponseToForm";
import editUser from "@/api/editUser";
import uploadImage from "@/api/uploadImage";
import { toast } from "react-toastify";
import { T } from "@/theme";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const boxWidth = isDesktop ? "80%" : "100%";

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handlePreferences = () => {
    navigation.navigate("preferences");
  };

  const selectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const path = result.assets?.[0].uri;
      if (!path || !token) return;

      const profile_img = await uploadImage(path);
      await editUser({ profile_img });
      dispatch(updateUser({ profile_img }));
      toast.success("Profile image updated successfully");
    } catch (err) {
      handleError(err);
    }
  };

  const handleEdit = async (values: UserForm) => {
    try {
      await editUser(values);
      dispatch(updateUser(values));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.root}>
      {user._id ? (
        <View style={styles.root}>
          <Navbar />
          <Formik
            initialValues={fromResponseToForm(user)}
            onSubmit={handleEdit}
            validationSchema={RegisterSchema}
          >
            <AppScrollView
              style={styles.scrollview}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.avatarSection}>
                <InteractiveProfilePicture
                  onPress={selectImage}
                  url={user.profile_img}
                />
                <Text style={styles.username}>@{user.username}</Text>
              </View>

              <Text style={styles.sectionLabel}>Profile Info</Text>
              <View style={[styles.card, { width: boxWidth }]}>
                <ChangeData field="username" placeholder="Username" />
                <ChangeData field="first_name" placeholder="First name" />
                <ChangeData field="last_name" placeholder="Last name" />
                <ChangeData field="address" placeholder="Address" />
                <ChangeData field="email" placeholder="Email" />
                <ChangeData field="phone" placeholder="Phone" />
                <ChangeData
                  type="date"
                  field="birthdate"
                  placeholder="Birthdate"
                />
              </View>

              <Text style={styles.sectionLabel}>Settings</Text>
              <View style={[styles.actionGroup, { width: boxWidth }]}>
                <TouchableOpacity
                  onPress={handlePreferences}
                  style={styles.actionRow}
                >
                  <Text style={styles.actionText}>Preferences</Text>
                  <Text style={styles.actionChevron}>›</Text>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.actionRow}
                >
                  <Text style={[styles.actionText, styles.logoutText]}>
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </AppScrollView>
          </Formik>
        </View>
      ) : (
        <LoginScreen />
      )}
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  scrollview: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 32,
  },
  username: {
    color: T.textMuted,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    letterSpacing: 0.3,
  },
  sectionLabel: {
    color: T.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 8,
  },
  card: {
    backgroundColor: T.bgCard,
    borderRadius: T.radius.lg,
    borderWidth: 1,
    borderColor: T.border,
    marginBottom: 24,
    overflow: "hidden",
    width: "100%",
  },
  actionGroup: {
    backgroundColor: T.bgCard,
    borderRadius: T.radius.lg,
    borderWidth: 1,
    borderColor: T.border,
    overflow: "hidden",
    marginBottom: 24,
    width: "100%",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionDivider: {
    height: 1,
    backgroundColor: T.border,
    marginHorizontal: 16,
  },
  actionText: {
    color: T.text,
    fontSize: 15,
    fontWeight: "500",
  },
  actionChevron: {
    color: T.textMuted,
    fontSize: 20,
  },
  logoutText: {
    color: "#FF5C5C",
  },
});
