import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserPlans } from "../api/getUserPlans";
import { styles } from "../styles/PlanDetails";
import { useSelector, useDispatch } from "react-redux";
import { setUserPlans } from "../state/user";
import axios from "axios";
import Comments from "./Plan/Comments";
import GenericButton from "./GenericButton";
import MultipleDropdown from "./MultipleDropdown";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { API_URL } from "@env";
import RadioButton from "./RadioButton";
import { Entypo } from "@expo/vector-icons";
import { getUserFriends } from "../api/getUserFriends";
import fecha from "../assets/fecha.png";
import descripcion from "../assets/descripcion.png";
import organizador from "../assets/organizador.png";
import { RootState } from "@/state/store";
import UserResponse from "@/interfaces/responses/User";
import IOption from "@/interfaces/Option";
import PlanEnded from "./Plan/Ended";
import { discardUser } from "@/api/discardUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const PlanDetailCard = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state: RootState) => state.selectedPlan);
  const user = useSelector((state: RootState) => state.user);

  const sendMethods = [
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "phone" },
  ];
  const [sendMethod] = useState<IOption>(sendMethods[0]);

  const [_, setUsers] = useState<UserResponse[]>([]);
  const [friends, setFriends] = useState<IOption[]>([]);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invited, setInvited] = useState<IOption[]>();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const fetchInfo = async () => {
    try {
      let users = await getUserFriends();
      setUsers(users);
      const friends = users.filter((item) => item.email);
      const friendsOptions = friends.map((item) => ({
        label: item.username,
        value: item.email,
      }));
      setFriends(friendsOptions);

      const token = await AsyncStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(
          `${API_URL}/events/${plan._id}/can-update`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCanEdit(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const formattingDate = plan?.start_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await axios.post(
          `${API_URL}/events/enroll`,
          { eventId: plan._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newPlans = await getUserPlans();
        dispatch(setUserPlans(newPlans));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleStopParticipating = async (id: string | null) => {
    setLoading(true);
    id && (await discardUser(id, dispatch));
    setLoading(false);
  };

  return (
    <View style={styles.detailsContainer}>
      <View>
        {plan.ended ? (
          <PlanEnded plan={plan} user={user} />
        ) : (
          <View>
            {user._id && (
              <View style={styles.buttonContainer}>
                {!user.plans?.some((userPlan) => userPlan._id === plan._id) ? (
                  <>
                    {!loading ? (
                      <GenericButton
                        text={"+"}
                        onPress={handleEnroll}
                        customStyle={styles.btn}
                      />
                    ) : (
                      <GenericButton text={"..."} customStyle={styles.btn} />
                    )}
                  </>
                ) : (
                  <>
                    {!loading ? (
                      <GenericButton
                        text={"x"}
                        customStyle={styles.btn}
                        onPress={() => handleStopParticipating(plan._id)}
                      />
                    ) : (
                      <GenericButton text={"..."} customStyle={styles.btn} />
                    )}
                  </>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.pContainer}>
        <Text style={styles.p}>
          {plan?.organizer?.rating?.toFixed(2)}/5.00
          <Entypo name="star" size={20} color={"#fdd835"} />
        </Text>
      </View>
      <View style={styles.date}>
        <Image style={styles.logo} source={fecha} />
        <Text style={styles.text2}>{formattingDate}</Text>
      </View>

      <View style={styles.orgCont}>
        <Image style={styles.logo5} source={organizador} />
      </View>
      <Text style={styles.text6}>{plan?.organizer?.username}</Text>
      <Image style={styles.logo3} source={descripcion} />
      <Text style={styles.text3}>{plan.description}</Text>
      {user._id && <Comments plan={plan} />}
      {canEdit && user._id ? (
        <View>
          <View style={styles.input}>
            <GenericButton
              text={"Editar evento"}
              onPress={() => {
                navigation.navigate("EditPlan");
              }}
            />
          </View>
          <View style={styles.input}>
            <GenericButton text={"Borrar evento"} onPress={() => {}} />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.input}>
            <MultipleDropdown
              setSelected={(val: IOption[]) => setInvited(val)}
              data={friends}
              save="value"
              onSelect={() => {}}
              label="Invitar personas"
              placeholder="Invitar personas"
              search={false}
              textStyles={styles.item}
              boxStyles={styles.dropdown}
              dropdownStyles={styles.dropdown}
              badgeStyles={styles.item}
            />
            <RadioButton
              options={sendMethods}
              onSelect={() => {}}
              defaultValue={sendMethod}
            />
          </View>
          {invited && (
            <GenericButton
              text={"Invitar"}
              customStyle={{ marginHorizontal: 50 }}
            />
          )}
        </>
      )}
      <View style={{ marginBottom: 10 }}></View>
    </View>
  );
};
