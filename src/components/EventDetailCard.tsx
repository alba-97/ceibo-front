import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import getUserEvents from "../api/getUserEvents";
import { useSelector, useDispatch } from "react-redux";
import { addUserEvent, setUserEvents } from "../state/user";
import Comments from "./Event/Comments";
import GenericButton from "./GenericButton";
import MultipleDropdown from "./MultipleDropdown";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import RadioButton from "./RadioButton";
import { Entypo } from "@expo/vector-icons";
import getUserFriends from "../api/getUserFriends";
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
import IOptionSelect from "@/interfaces/OptionSelect";

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
  const [friends, setFriends] = useState<IOptionSelect[]>([]);
  const [invited, setInvited] = useState<IOptionSelect[]>([]);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <View style={styles.container}>
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

      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>
          {event?.createdBy?.rating?.toFixed(2)}/5.00
          <Entypo name="star" size={20} color={"#fdd835"} />
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.logoText}>Date</Text>
        <Text style={styles.date}>{formattingDate}</Text>
      </View>

      <Text style={styles.logoText}>Organizer</Text>
      <Text style={styles.username}>{event?.createdBy?.username}</Text>
      <Text style={styles.logoText}>Description</Text>

      <Text style={styles.description}>{event.description}</Text>
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
              data={friends}
              onSelect={(selectedItems) => {
                setInvited(selectedItems);
              }}
              selectedValues={invited}
              placeholder="Invite people"
            />
            <RadioButton
              options={sendMethods}
              onSelect={() => {}}
              defaultValue={sendMethod}
            />
          </View>
          <GenericButton
            text={"Invite"}
            buttonStyle={{ marginHorizontal: 50 }}
          />
        </>
      )}
      <View style={{ marginBottom: 10 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 5,
    padding: 20,
  },
  logoText: {
    fontFamily: "Melts",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
    marginBottom: 20,
    marginTop: 30,
    fontSize: 40,
    textAlign: "center",
  },
  input: {
    justifyContent: "center",
    flexDirection: "row",
  },
  dateContainer: {
    flexDirection: "row",
  },
  date: {
    fontWeight: "300",
    fontSize: 18,
    color: "#fff",
  },
  username: {
    top: -4,
    fontSize: 18,
    color: "#fff",
  },
  description: {
    fontSize: 18,
    color: "#fff",
  },
  rating: {
    fontSize: 18,
    color: "#fff",
    paddingRight: 40,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    top: -12,
  },
  btn: {
    width: 60,
    height: 45,
    borderRadius: 5,
  },
});
