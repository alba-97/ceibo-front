import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

interface IScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode;
  setIsStill?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default forwardRef<ScrollView, IScrollViewProps>(
  (
    { children, setIsStill, ...props }: IScrollViewProps,
    forwardedRef: ForwardedRef<ScrollView>
  ) => {
    const localRef = useRef<ScrollView>(null);
    useImperativeHandle(forwardedRef, () => localRef.current as ScrollView);

    const { refs } = useDraggableScroll<ScrollView>({
      outerRef: localRef,
      cursor: "grab",
      setIsStill,
    });

    return (
      <ScrollView
        ref={refs}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);
