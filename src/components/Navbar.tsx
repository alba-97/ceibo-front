import { Image } from "react-native";
import logo from "../assets/logo.png";
import { styles } from "../styles/navbarStyles";
import AppView from "./AppView";

export const Navbar = () => {
  return (
    <AppView className="py-20 align-center border-b-1 border-b-white w-full">
      <Image style={styles.logo} source={logo} />
    </AppView>
  );
};
