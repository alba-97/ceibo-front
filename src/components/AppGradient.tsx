import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";

interface IAppGradientProps {
  className?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default ({ className, children, ...props }: IAppGradientProps) => {
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};
