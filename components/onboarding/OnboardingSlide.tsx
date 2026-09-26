import NextButton from "@/components/onboarding/NextButton";
import Pagination from "@/components/onboarding/Pagination";
import SkipLink from "@/components/onboarding/SkipLink";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OnboardingSlideProps = {
    illustration: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    activeIndex: number;
    totalSteps: number;
    onSkip: () => void;
    onNext: () => void;
    decorations?: ReactNode;
};

const OnboardingSlide = ({
    illustration,
    title,
    subtitle,
    activeIndex,
    totalSteps,
    onSkip,
    onNext,
    decorations,
}: OnboardingSlideProps) => {
    return (
        <View className="flex-1">
            <LinearGradient colors={["#FFFFFF", "#FCE7ED"]} className="absolute inset-0" />
            {decorations}
            <SafeAreaView className="flex-1">
                <SkipLink onPress={onSkip} />

                <View className="flex-1 items-center justify-center pt-4">
                    {illustration}

                    <View className="mt-10">
                        <Pagination total={totalSteps} activeIndex={activeIndex} />
                    </View>

                    <View className="mt-6 items-center px-8">{title}</View>

                    {subtitle ? <View className="mt-3 items-center px-8">{subtitle}</View> : null}
                </View>

                <View className="pb-8">
                    <NextButton onPress={onNext} />
                </View>
            </SafeAreaView>
        </View>
    );
};
export default OnboardingSlide;
