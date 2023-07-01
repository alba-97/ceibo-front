import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MultipleDropdown from "../MultipleDropdown";
import RadioButton from "../RadioButton";
import { styles } from "../../styles/PlanDetails";
import GenericButton from "../GenericButton";
import { API_URL } from "../../services/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getUserFriends } from "../../services/getUserFriends";

const PlanInvite = ({ plan }) => {
  const sendMethods = [
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "phone" },
  ];
  const [sendMethod, setSendMethod] = useState(sendMethods[0].value);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [invited, setInvited] = useState([]);

  const handleChange = (method) => {
    try {
      let friends = users.filter((item) => item[method]);
      friends = friends.map((item) => ({
        label: item.username,
        value: item[method],
      }));
      setSendMethod(method);
      setFriends(friends);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/api/users/invite`,
          {
            users: invited,
            plan,
            method: sendMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("OK", "Invitaciones enviadas");
      } else {
        Alert.alert("Error", "Error de autenticación");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar invitaciones");
    }
  };

  const fetchInfo = async () => {
    try {
      let users = await getUserFriends();
      users = users.map((item) => ({
        username: item.username,
        email: item.email,
        phone: item.phone,
      }));
      setUsers(users);

      let friends = users.filter((item) => item.email);
      friends = friends.map((item) => ({
        label: item.username,
        value: item.email,
      }));
      setFriends(friends);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <View style={styles.input}>
      <MultipleDropdown
        setSelected={(val) => setInvited(val)}
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
        onSelect={handleChange}
        defaultValue={sendMethod}
      />
      {invited && invited[0] && (
        <GenericButton
          text={"Invitar"}
          customStyle={{ marginHorizontal: 50 }}
          onPress={handleInvite}
        />
      )}
    </View>
  );
};

export default PlanInvite;
