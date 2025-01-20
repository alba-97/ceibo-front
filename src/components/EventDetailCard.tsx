import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import getUserEvents from "../api/getUserEvents";
import { styles } from "../styles/EventDetails";
import { useSelector, useDispatch } from "react-redux";
import { addUserEvent, setUserEvents } from "../state/user";
import Comments from "./Event/Comments";
import GenericButton from "./GenericButton";
import MultipleDropdown from "./MultipleDropdown";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import RadioButton from "./RadioButton";
import { Entypo } from "@expo/vector-icons";
import getUserFriends from "../api/getUserFriends";
import fecha from "../assets/fecha.png";
import descripcion from "../assets/descripcion.png";
import organizador from "../assets/organizador.png";
import { RootState } from "@/state/store";
import UserResponse from "@/interfaces/responses/User";
import IOption from "@/interfaces/Option";
import EventEnded from "./Event/Ended";
import discardUser from "@/api/discardUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import getEditableEvents from "@/api/getEditableEvents";
import enrollUser from "@/api/enrollUser";
import fromUserResponsesToOptions from "@/utils/user/fromUserResponsesToOptions";
import handleError from "@/utils/handleError";
import formatDate from "@/utils/formatDate";

export const EventDetailCard = () => {
  const dispatch = useDispatch();
  const event = useSelector((state: RootState) => state.selectedEvent);
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
      const { data: friends } = await getUserFriends();
      setUsers(friends);

      const friendsOptions = fromUserResponsesToOptions(friends);
      setFriends(friendsOptions);

      const canEdit = await getEditableEvents(event._id);
      setCanEdit(canEdit);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const formattingDate = formatDate(event.start_date);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const data = await enrollUser(event._id);
      dispatch(addUserEvent(data));
      const { data: events } = await getUserEvents();
      dispatch(setUserEvents(events));
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleStopParticipating = async (id: string | null) => {
    if (!id) return;
    setLoading(true);
    try {
      await discardUser(id);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.detailsContainer}>
      <View>
        {event.ended ? (
          <EventEnded event={event} user={user} />
        ) : (
          <View>
            {user._id && (
              <View style={styles.buttonContainer}>
                {!user.events?.some(
                  (userEvent) => userEvent._id === event._id
                ) ? (
                  <>
                    {!loading ? (
                      <GenericButton
                        text={"+"}
                        onPress={handleEnroll}
                        buttonStyle={styles.btn}
                      />
                    ) : (
                      <GenericButton text={"..."} buttonStyle={styles.btn} />
                    )}
                  </>
                ) : (
                  <>
                    {!loading ? (
                      <GenericButton
                        text={"x"}
                        buttonStyle={styles.btn}
                        onPress={() => handleStopParticipating(event._id)}
                      />
                    ) : (
                      <GenericButton text={"..."} buttonStyle={styles.btn} />
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
          {event?.createdBy?.rating?.toFixed(2)}/5.00
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
      <Text style={styles.text6}>{event?.createdBy?.username}</Text>
      <Image style={styles.logo3} source={descripcion} />
      <Text style={styles.text3}>{event.description}</Text>
      {user._id && <Comments event={event} />}
      {canEdit && user._id ? (
        <View>
          <View style={styles.input}>
            <GenericButton
              text={"Editar evento"}
              onPress={() => {
                navigation.navigate("EditEvent");
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
              buttonStyle={{ marginHorizontal: 50 }}
            />
          )}
        </>
      )}
      <View style={{ marginBottom: 10 }}></View>
    </View>
  );
};
