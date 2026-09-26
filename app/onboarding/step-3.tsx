import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";
import { Text } from "react-native";

// Placeholder screen — content to be implemented for onboarding step 3
const OnboardingStepThree = () => {
    const complete = useOnboardingStore((state) => state.complete);

    const handleSkip = () => {
        complete();
        router.replace("/(tabs)");
    };

    const handleNext = () => {
        router.push("/onboarding/name");
    };

    return (
        <OnboardingSlide
            activeIndex={1}
            totalSteps={3}
            onSkip={handleSkip}
            onNext={handleNext}
            illustration={null}
            title={
                <Text className="text-center text-[28px] leading-[32px] font-quicksand-bold text-[#1A1A1A]">
                    Step 3
                </Text>
            }
        />
    );
};
export default OnboardingStepThree;
