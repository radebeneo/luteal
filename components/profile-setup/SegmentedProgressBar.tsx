import cn from "clsx";
import { View } from "react-native";

type SegmentedProgressBarProps = {
    currentStep: number;
    totalSteps: number;
};

const SegmentedProgressBar = ({ currentStep, totalSteps }: SegmentedProgressBarProps) => {
    return (
        <View className="flex-1 flex-row gap-x-1.5">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    className={cn("flex-1 h-1.5 rounded-full", index < currentStep ? "bg-plum" : "bg-blush-200")}
                />
            ))}
        </View>
    );
};

export default SegmentedProgressBar;
