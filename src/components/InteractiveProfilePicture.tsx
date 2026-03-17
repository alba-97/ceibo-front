import { TouchableOpacity } from "react-native";
import ProfilePicture from "./ProfilePicture";

interface IInteractiveProfilePictureProps {
  url: string;
  onPress: () => void;
}

const InteractiveProfilePicture = ({
  url,
  onPress,
}: IInteractiveProfilePictureProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ProfilePicture imageSource={url} />
    </TouchableOpacity>
  );
};

export default InteractiveProfilePicture;
