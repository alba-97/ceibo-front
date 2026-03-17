import { View, ViewStyle } from "react-native";

interface IAppGradientProps {
  className?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default ({ className, children, style, ...props }: IAppGradientProps) => {
  return (
    <View style={[{ backgroundColor: "#121212" }, style]} {...props}>
      {children}
    </View>
  );
};
