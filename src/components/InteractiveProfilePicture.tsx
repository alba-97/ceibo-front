import { StyleSheet, TouchableOpacity } from "react-native";
import GenericButton from "./GenericButton";
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
    <div>
      {url ? (
        <TouchableOpacity onPress={onPress}>
          <ProfilePicture imageSource={url} />
        </TouchableOpacity>
      ) : (
        <GenericButton
          onPress={onPress}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          text={"Select image"}
        />
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#7D0166",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    borderWidth: 1,
    borderColor: "white",
    color: "#fff",
    textAlign: "center",
  },
});

export default InteractiveProfilePicture;
