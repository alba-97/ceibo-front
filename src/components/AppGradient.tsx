import fromClassNameToStyles from "@/utils/fromClassNameToStyles";
import { LinearGradient } from "expo-linear-gradient";

interface IAppGradientProps {
  className?: string;
  children?: React.ReactNode;
}

export default ({ className, children, ...props }: IAppGradientProps) => {
  const combinedStyles = fromClassNameToStyles(className);

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={combinedStyles}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};
