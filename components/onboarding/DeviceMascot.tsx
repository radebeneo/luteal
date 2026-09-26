import { Image } from "expo-image";

interface DeviceMascotProps {
    size: number;
}

const DeviceMascot = ({ size }: DeviceMascotProps) => {
    return (
        <Image
            source={require("@/assets/images/screen-four-deco.svg")}
            style={{ width: size, height: (size * 395) / 313 }}
            contentFit="contain"
            accessibilityLabel="A smiling cycle tracking device with a display and cord"
        />
    );
};

export default DeviceMascot;