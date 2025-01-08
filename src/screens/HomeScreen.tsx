import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Navbar } from "@/components/Navbar";
import { SwiperComponent } from "@/components/Swiper";
import { MainEvent } from "@/components/MainEvent";
import getAllPlans from "@/api/getAllPlans";
import getUserPlans from "@/api/getUserPlans";
import getFilteredPlans from "@/api/getFilteredPlans";
import getUser from "@/api/getUser";
import getPlan from "@/api/getPlan";
import { useSelector, useDispatch } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { setSelectedPlan, setAuthor } from "@/state/selectedPlan";
import { setPlanHistory, setUser, setUserPlans } from "@/state/user";
import { setPlans } from "@/state/plans";
import refetchData from "@/utils/refetchData";
import getPlanHistory from "@/api/getPlanHistory";
import noTienesPlanes from "@/assets/noTienesPlanes.png";
import recomendaciones from "@/assets/recomendaciones.png";
import misPlanes from "@/assets/misPlanes.png";
import noPlanesCreados from "@/assets/noPlanesCreados.png";
import planesPasados from "@/assets/planesPasados.png";
import { RootState } from "@/state/store";
import EventResponse from "@/interfaces/responses/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";

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
      dispatch(setAuthor(updatedPlan.createdBy));

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
        const { data: plans } = await getAllPlans();
        dispatch(setPlans(plans));
        return;
      }
      dispatch(setUser(userData));

      const { data: userPlans } = await getUserPlans();
      dispatch(setUserPlans(userPlans));

      const { data: planHistory } = await getPlanHistory();
      dispatch(setPlanHistory(planHistory));

      if (userData.preferences[0]) {
        const { data: plans } = await getFilteredPlans();
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
    <AppGradient style={styles.gradient}>
      <Navbar />
      <AppScrollView>
        {plans[0] && (
          <MainEvent
            plan={plans[0]}
            title="Patrocinado"
            onPress={handlePress}
          />
        )}
        <View style={styles.logo}>
          <Image style={styles.recomendations} source={recomendaciones} />
        </View>
        <SwiperComponent plans={plans} onPress={handlePress} />
        {user._id && (
          <View>
            <View style={styles.logo}>
              <Image style={styles.myEvents} source={misPlanes} />
            </View>
            {user.plans?.[0] ? (
              <SwiperComponent plans={user.plans} onPress={handlePress} />
            ) : (
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Image style={styles.logo} source={noTienesPlanes} />
                </View>
              </View>
            )}
            {user.history && user.history[0] ? (
              <View>
                <View style={styles.logo}>
                  <Image style={styles.myEvents} source={planesPasados} />
                </View>
                <SwiperComponent plans={user.history} onPress={handlePress} />
              </View>
            ) : (
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Image style={styles.noEvents} source={noPlanesCreados} />
                </View>
              </View>
            )}
          </View>
        )}
        <View style={styles.spacer} />
      </AppScrollView>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    paddingTop: 15,
    borderRadius: 18,
    alignItems: "center",
    marginVertical: 10,
  },
  recomendations: {
    width: 280,
    height: 20,
  },
  myEvents: {
    width: 120,
    height: 20,
  },
  noEvents: {
    width: 198,
    height: 62,
  },
  spacer: {
    marginBottom: 30,
  },
});
