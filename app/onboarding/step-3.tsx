import DropletIcon from "@/components/onboarding/DropletIcon";
import DropletMascot from "@/components/onboarding/DropletMascot";
import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import { useCompleteOnboarding } from "@/lib/useCompleteOnboarding";
import { router } from "expo-router";
import { Dimensions, Text, View } from "react-native";

const MASCOT_SIZE = Dimensions.get("window").width * 0.66;

// Positions are tuned against the 3. Welcome screen.png mockup (400x866 reference frame)
const DROPLETS = [
    { top: "11%", left: "49%", size: 14, opacity: 1, color: "#3F2E45" },
    { top: "14%", left: "82%", size: 8, opacity: 0.45, color: "#B98CDD" },
    { top: "25%", left: "33%", size: 11, opacity: 0.9, color: "#3F2E45" },
    { top: "26%", left: "80%", size: 8, opacity: 0.45, color: "#B98CDD" },
    { top: "49%", left: "18%", size: 11, opacity: 0.8, color: "#3F2E45" },
] as const;

const OnboardingStepThree = () => {
    const handleSkip = useCompleteOnboarding();

    const handleNext = () => {
        router.push("/onboarding/step-4");
    };

    return (
        <OnboardingSlide
            activeIndex={1}
            totalSteps={3}
            onSkip={handleSkip}
            onNext={handleNext}
            decorations={
                <View
                    className="absolute inset-0"
                    pointerEvents="none"
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                >
                    {DROPLETS.map((droplet, index) => (
                        <View
                            key={index}
                            className="absolute"
                            style={{ top: droplet.top, left: droplet.left }}
                        >
                            <DropletIcon
                                size={droplet.size}
                                color={droplet.color}
                                opacity={droplet.opacity}
                            />
                        </View>
                    ))}
                </View>
            }
            illustration={<DropletMascot size={MASCOT_SIZE} />}
            title={
                <Text className="text-center text-[28px] leading-[32px] font-fredoka-bold text-[#1A1A1A]">
                    Effortless Tracking,{"\n"}All in One Place
                </Text>
            }
            subtitle={
                <Text className="text-center paragraph-medium text-[#6B6470]">
                    {/* TODO: confirm full subtitle copy — the source mockup text is cut off
                    after "symptoms" with no closing punctuation */}
                    Bloomy, tracking your cycle has never been simpler. Effortlessly log your
                    period, symptoms
                </Text>
            }
        />
    );
};
export default OnboardingStepThree;
