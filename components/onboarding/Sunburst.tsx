import Svg, { Line } from "react-native-svg";

interface SunburstProps {
    size: number;
}

const RAYS = [
    { angle: -168, length: 28, opacity: 0.68 },
    { angle: -146, length: 22, opacity: 0.42 },
    { angle: -124, length: 34, opacity: 0.52 },
    { angle: -102, length: 18, opacity: 0.72 },
    { angle: -80, length: 30, opacity: 0.45 },
    { angle: -58, length: 22, opacity: 0.6 },
    { angle: -36, length: 35, opacity: 0.42 },
    { angle: -14, length: 20, opacity: 0.68 },
    { angle: 8, length: 31, opacity: 0.46 },
    { angle: 30, length: 24, opacity: 0.62 },
    { angle: 52, length: 36, opacity: 0.43 },
    { angle: 74, length: 19, opacity: 0.66 },
    { angle: 96, length: 29, opacity: 0.48 },
    { angle: 118, length: 23, opacity: 0.6 },
    { angle: 140, length: 34, opacity: 0.4 },
    { angle: 162, length: 21, opacity: 0.64 },
    { angle: 184, length: 30, opacity: 0.46 },
    { angle: 206, length: 25, opacity: 0.58 },
] as const;

const Sunburst = ({ size }: SunburstProps) => {
    const center = 180;

    return (
        <Svg width={size} height={size} viewBox="0 0 360 360">
            {RAYS.map(({ angle, length, opacity }) => {
                const radians = (angle * Math.PI) / 180;
                const innerRadius = 105;
                const outerRadius = innerRadius + length;

                return (
                    <Line
                        key={angle}
                        x1={center + Math.cos(radians) * innerRadius}
                        y1={center + Math.sin(radians) * innerRadius}
                        x2={center + Math.cos(radians) * outerRadius}
                        y2={center + Math.sin(radians) * outerRadius}
                        stroke="#F0E1F7"
                        strokeOpacity={opacity}
                        strokeWidth={5}
                        strokeLinecap="round"
                    />
                );
            })}
        </Svg>
    );
};

export default Sunburst;