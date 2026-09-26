import BloomyMascot from "@/components/onboarding/BloomyMascot";
import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";
import { Dimensions, Text } from "react-native";

const MASCOT_SIZE = Dimensions.get("window").width * 0.58;

const OnboardingStepTwo = () => {
    const complete = useOnboardingStore((state) => state.complete);

    const handleSkip = () => {
        complete();
        router.replace("/(tabs)");
    };

    const handleNext = () => {
        router.push("/onboarding/step-3");
    };

    return (
        <OnboardingSlide
            activeIndex={0}
            totalSteps={3}
            onSkip={handleSkip}
            onNext={handleNext}
            illustration={<BloomyMascot size={MASCOT_SIZE} />}
            title={
                <Text className="text-center text-[28px] leading-[32px] font-quicksand-bold text-[#1A1A1A]">
                    Your Smart{"\n"}Cycle Companion
                </Text>
            }
            subtitle={
                <Text className="text-center paragraph-medium text-[#6B6470]">
                    Bloomy is your intelligent, personal period tracker designed to help
                    you understand.
                </Text>
            }
        />
    );
};
export default OnboardingStepTwo;
