import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ScrollView, View, Image } from "react-native";
import { styles } from "../appCss";
import { Navbar } from "../components/Navbar";
import { SwiperComponent } from "../components/Swiper";
import { MainEvent } from "../components/MainEvent";
import getAllPlans from "../api/getAllPlans";
import getUserPlans from "../api/getUserPlans";
import getFilteredPlans from "../api/getFilteredPlans";
import getUser from "../api/getUser";
import getPlan from "../api/getPlan";
import { useSelector, useDispatch } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { setSelectedPlan, setOrganizer } from "../state/selectedPlan";
import { setPlanHistory, setUser, setUserPlans } from "../state/user";
import { setPlans } from "../state/plans";
import getOrganizer from "../api/getOrganizer";
import refetchData from "../utils/refetchData";
import getPlanHistory from "../api/getPlanHistory";
import noTienesPlanes from "../assets/noTienesPlanes.png";
import recomendaciones from "../assets/recomendaciones.png";
import misPlanes from "../assets/misPlanes.png";
import noPlanesCreados from "../assets/noPlanesCreados.png";
import planesPasados from "../assets/planesPasados.png";
import { RootState } from "@/state/store";
import EventResponse from "@/interfaces/responses/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user);
  const plans = useSelector((state: RootState) => state.plans);

  const { refetch } = refetchData();

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePress = async (plan: EventResponse) => {
    try {
      const updatedPlan = await getPlan(plan._id);
      dispatch(setSelectedPlan(updatedPlan));
      const organizer = await getOrganizer(plan._id);
      dispatch(setOrganizer(organizer));
      navigation.navigate("PlanDetail");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      return userData;
    } catch (err) {
      return;
    }
  };

  const fetchData = async () => {
    try {
      const userData = await fetchUser();

      if (!userData) {
        const plans = await getAllPlans();
        dispatch(setPlans(plans));
        return;
      }

      dispatch(setUser(userData));
      const userPlans = await getUserPlans();
      dispatch(setUserPlans(userPlans));

      const planHistory = await getPlanHistory();
      dispatch(setPlanHistory(planHistory));

      if (userData.preferences[0]) {
        const plans = await getFilteredPlans();
        dispatch(setPlans(plans));
      } else {
        const plans = await getAllPlans();
        dispatch(setPlans(plans));
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <ScrollView>
        {plans[0] && (
          <MainEvent
            plan={plans[0]}
            title="Patrocinado"
            onPress={handlePress}
          />
        )}
        <SwiperComponent
          plans={plans}
          onPress={handlePress}
          image={recomendaciones}
          styleLogo={styles.logoReco}
        />

        {user._id && (
          <View>
            {user.plans && user.plans[0] ? (
              <SwiperComponent
                plans={user.plans}
                image={misPlanes}
                onPress={handlePress}
                styleLogo={styles.logoMisP}
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                <View style={styles.logoutContainer}>
                  <Image style={styles.logo} source={noTienesPlanes} />
                </View>
              </View>
            )}
            {user.history && user.history[0] ? (
              <SwiperComponent
                plans={user.history}
                onPress={handlePress}
                image={planesPasados}
                styleLogo={styles.logoMisPPasados}
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                <View style={styles.logoutContainer}>
                  <Image style={styles.logoNoPlanes} source={noPlanesCreados} />
                </View>
              </View>
            )}
          </View>
        )}
        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>
    </LinearGradient>
  );
}
