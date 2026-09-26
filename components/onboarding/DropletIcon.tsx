import Svg, { Path } from "react-native-svg";

type DropletIconProps = {
    size?: number;
    color?: string;
    opacity?: number;
};

// Simple solid teardrop used for the scattered background accents on onboarding screens
const DropletIcon = ({ size = 12, color = "#3F2E45", opacity = 1 }: DropletIconProps) => {
    return (
        <Svg width={size} height={size * 1.25} viewBox="0 0 8 10" fill="none">
            <Path
                d="M4 0C4 0 0 5.2 0 7.2C0 8.85 1.79 10 4 10C6.21 10 8 8.85 8 7.2C8 5.2 4 0 4 0Z"
                fill={color}
                opacity={opacity}
            />
        </Svg>
    );
};
export default DropletIcon;
