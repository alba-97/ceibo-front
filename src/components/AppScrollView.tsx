import fromClassNameToStyles from "@/utils/fromClassNameToStyles";
import { ScrollView, ScrollViewProps } from "react-native";

interface IAppViewProps extends ScrollViewProps {
  className?: string;
  children?: React.ReactNode;
}

export default ({ className, children, ...props }: IAppViewProps) => {
  const combinedStyles = fromClassNameToStyles(className);

  return (
    <ScrollView
      style={combinedStyles}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
