import DeviceMascot from "@/components/onboarding/DeviceMascot";
import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import Sunburst from "@/components/onboarding/Sunburst";
import { useCompleteOnboarding } from "@/lib/useCompleteOnboarding";
import { Dimensions, Text, View } from "react-native";

const MASCOT_SIZE = Dimensions.get("window").width * 0.84;

const OnboardingStepFour = () => {
    const handleSkip = useCompleteOnboarding();

    const handleNext = () => {
        handleSkip();
    };

    return (
        <OnboardingSlide
            activeIndex={2}
            totalSteps={3}
            onSkip={handleSkip}
            onNext={handleNext}
            showSkip={false}
            illustration={
                <View
                    className="items-center justify-center"
                    style={{ width: MASCOT_SIZE, height: (MASCOT_SIZE * 395) / 313 }}
                >
                    <View className="absolute">
                        <Sunburst size={MASCOT_SIZE} />
                    </View>
                    <DeviceMascot size={MASCOT_SIZE} />
                </View>
            }
            title={
                <Text className="text-center text-[28px] leading-[32px] font-quicksand-bold text-[#1A1A1A]">
                    Stay Informed,{"\n"}Stay Empowered
                </Text>
            }
            subtitle={
                <Text className="text-center paragraph-medium text-[#6B6470]">
                    Explore a wealth of articles and tips on menstrual health, lifestyle, and well being.
                </Text>
            }
        />
    );
};
export default OnboardingStepFour;
