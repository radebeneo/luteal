import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";

const OnboardingSplash = () => {
    const handleNext = () => {
        router.push("/onboarding/step-2");
    };

    return (
        <OnboardingSlide
            activeIndex={0}
            totalSteps={3}
            onNext={handleNext}
            illustration={
                <View className="size-40 rounded-full bg-primary/20 items-center justify-center">
                    <Image
                        source={require("@/assets/images/onboarding-mark.png")}
                        style={{ width: 120, height: 120 }}
                        contentFit="contain"
                    />
                </View>
            }
            title={
                <Text className="text-[32px] leading-[36px] font-fredoka-bold text-dark-100">
                    Luteal Shield
                </Text>
            }
        />
    );
};
export default OnboardingSplash;
