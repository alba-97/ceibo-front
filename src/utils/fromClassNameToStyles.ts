import baseStyles from "@/styles/baseStyles";
import { StyleSheet } from "react-native";

export default (className?: string) => {
  return className
    ? StyleSheet.flatten([
        className.split(" ").map((name: string) => {
          const key = name.trim() as keyof typeof baseStyles;
          return baseStyles[key];
        }),
      ])
    : {};
};
