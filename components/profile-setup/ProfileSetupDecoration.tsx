import { Image } from "expo-image";

const ProfileSetupDecoration = () => (
    <Image
        source={require("@/assets/images/screen-two-deco.svg")}
        style={{ width: 90, height: 102, marginBottom: 10, alignSelf: "center" }}
        contentFit="contain"
        accessibilityLabel="Bloomy, the LutealShield mascot"
    />
);

export default ProfileSetupDecoration;