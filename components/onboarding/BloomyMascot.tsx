import { Image } from "expo-image";

// Aspect ratio of the shared Bloomy illustration asset (width / height)
const ASPECT_RATIO = 353 / 383;

type BloomyMascotProps = {
    size?: number;
};

const BloomyMascot = ({ size = 220 }: BloomyMascotProps) => {
    return (
        <Image
            source={require("@/assets/images/screen-two-deco.svg")}
            style={{ width: size, height: size / ASPECT_RATIO }}
            contentFit="contain"
            accessibilityLabel="Bloomy, the LutealShield mascot"
        />
    );
};
export default BloomyMascot;
