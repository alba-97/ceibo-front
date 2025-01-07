import { Text, Image } from "react-native";
import { useSelector } from "react-redux";
import Comments from "../components/Plan/Comments";
import PlanOrganizer from "../components/Plan/Organizer";
import PlanEnded from "../components/Plan/Ended";
import PlanInvite from "../components/Plan/Invite";
import PlanEnroll from "../components/Plan/Enroll";
import PlanEdit from "../components/Plan/Edit";
import { styles } from "../styles/PlanDetails";
import descripcion from "../assets/descripcion.png";
import { Navbar } from "../components/Navbar";
import { RootState } from "@/state/store";
import AppScrollView from "@/components/AppScrollView";
import AppGradient from "@/components/AppGradient";
import AppView from "@/components/AppView";

export default function PlanDetailScreen() {
  const plan = useSelector((state: RootState) => state.selectedPlan);
  const user = useSelector((state: RootState) => state.user);

  return (
    <AppGradient>
      <Navbar />
      <AppScrollView>
        <AppView>
          <Text style={styles.title}>{plan?.title}</Text>
          <Image
            source={{ uri: plan?.img }}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        </AppView>
        <AppView className="justify-center mt-5 p-20">
          <AppView>
            {plan.ended ? (
              <PlanEnded plan={plan} user={user} />
            ) : (
              <PlanEnroll plan={plan} user={user} />
            )}
          </AppView>

          <PlanOrganizer plan={plan} />

          <Image style={styles.logo3} source={descripcion} />
          <Text style={styles.text3}>{plan.description}</Text>
          {user._id && (
            <AppView>
              <Comments plan={plan} />
              <PlanEdit plan={plan} />
              <PlanInvite plan={plan} />
            </AppView>
          )}
        </AppView>
      </AppScrollView>
    </AppGradient>
  );
}
