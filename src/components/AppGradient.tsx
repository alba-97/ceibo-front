import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";

interface IAppGradientProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default ({ children, style }: IAppGradientProps) => (
  <LinearGradient
    colors={["#07090F", "#0C1220"]}
    style={[{ flex: 1, width: "100%" }, style]}
  >
    {children}
  </LinearGradient>
);
