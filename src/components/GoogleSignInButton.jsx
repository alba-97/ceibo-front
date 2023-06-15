import { useEffect, useState } from "react";
import { GenericInput } from "./GenericInput";
import * as ReactNative from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

//Correr los siguientes comandos :
// 1- npm i -g eas-cli
// 2- eas login , una vez iniciado deberas poner datos de tu cuenta de expo
// 3- eas build:configure

const GoogleSignInButton = () => {
  //Form Data
  const [username, setUsername] = useState("");
  const [address, setAdress] = useState("");

  //Google
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "974579600414-1v01l7mpr0mmq55o4as5od0j6d3tp4p3.apps.googleusercontent.com",
    androidClientId:
      "974579600414-sv5uj31p852u9cv4hd713drs99ct3s5t.apps.googleusercontent.com",
    iosClientId:
      "974579600414-eqmbi1ffe3tk6kmqdvvic91aa74dslm2.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      // console.log("vengo de get user info", user);
      setUserInfo(user);
    } catch (error) {
      console.log("get user info error", error);
    }
  };

  const handleLogout = () => {
    try {
      setToken("");
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async () => {
    try {
      const { email, given_name, family_name, picture } = userInfo;
      const userData = {
        username: username,
        password: token,
        email: email,
        first_name: given_name,
        last_name: family_name,
        profile_img: picture,
        address: address,
      };

      const url = "http://localhost:3001/api/users/signup";
      const response = await axios.post(url, userData);
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.log("Error al hacer la petición:", error);
    }
  };

  const onPressButton = async () => {
    try {
      if (token) {
        await getUserInfo();
      } else {
        await promptAsync();
      }
    } catch (error) {
      console.log("fallo onPress", error);
    }
  };

  console.log("soy user info", userInfo);

  return (
    <ReactNative.SafeAreaView style={styles.container}>
      {!userInfo ? (
        <ReactNative.TouchableOpacity
          style={styles.button}
          onPress={onPressButton}
          disabled={!request}
        >
          <ReactNative.Text style={styles.buttonText}>
            {token ? "Login with Google" : "Sign Up with Google"}
          </ReactNative.Text>
        </ReactNative.TouchableOpacity>
      ) : (
        <>
          <ReactNative.Text>
            Por Favor ingrese los datos faltantes para acceder al home
          </ReactNative.Text>

          <GenericInput
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <GenericInput
            placeholder="Direccion"
            onChangeText={(text) => setAdress(text)}
            value={address}
          />

          <ReactNative.Button title="Logout" onPress={handleLogout} />
          <ReactNative.Button title="Confirmar Datos" onPress={handleSubmit} />
        </>
      )}
    </ReactNative.SafeAreaView>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#DB4437",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GoogleSignInButton;

/* LOG  soy user info {"email": "correa.ivanivan24@gmail.com",
         "family_name": "Correa", 
          "given_name": "Ivan", "id": "108162154590075096655",
         "locale": "es-419", "name": "Ivan Correa",
          "picture": "https://lh3.googleusercontent.com/a/AAcHTteMe00iDB_l0LqFvfbO3awpSy-VrT_8PzKLWPgIwg=s96-c", 
          "verified_email": true}
         */
