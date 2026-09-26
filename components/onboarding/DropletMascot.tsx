import { Image } from "expo-image";

// Aspect ratio of the combined droplet mascot + menstrual-calendar illustration (width / height)
const ASPECT_RATIO = 319 / 369;

type DropletMascotProps = {
    size?: number;
};

const DropletMascot = ({ size = 260 }: DropletMascotProps) => {
    return (
        <Image
            source={require("@/assets/images/screen-three-deco.svg")}
            style={{ width: size, height: size / ASPECT_RATIO }}
            contentFit="contain"
            accessibilityLabel="The droplet mascot holding up a menstrual calendar"
        />
    );
};
export default DropletMascot;
