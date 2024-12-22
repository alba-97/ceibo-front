import { genericButtonStyle } from "../styles/buttons";
import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";

interface IGenericButtonProps {
  text: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  customStyle?: ViewStyle | TextStyle;
}

const GenericButton = ({
  onPress,
  customStyle,
  textStyle,
  text,
}: IGenericButtonProps) => {
  return (
    <TouchableOpacity
      style={[genericButtonStyle.button, customStyle]}
      onPress={onPress}
    >
      <Text style={[genericButtonStyle.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
export default GenericButton;
