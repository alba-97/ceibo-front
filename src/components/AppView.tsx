import fromClassNameToStyles from "@/utils/fromClassNameToStyles";
import { View, ViewProps } from "react-native";

interface IAppViewProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export default ({ className, children, ...props }: IAppViewProps) => {
  const combinedStyles = fromClassNameToStyles(className);

  return (
    <View style={combinedStyles} {...props}>
      {children}
    </View>
  );
};
