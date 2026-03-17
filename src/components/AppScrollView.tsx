import { ScrollView, ScrollViewProps } from "react-native";

interface IScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode;
  setIsStill?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ({ children, setIsStill, contentContainerStyle, ...props }: IScrollViewProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ alignItems: "center" }, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
