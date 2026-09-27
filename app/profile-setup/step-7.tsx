import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { router } from "expo-router";
import { Text, View } from "react-native";

const AUDIENCE_OPTIONS = [
    {
        value: "pmdd",
        title: "I have PMDD",
        description: "You have a diagnosis and want a proactive emotional seatbelt.",
    },
    {
        value: "suspected-pmdd",
        title: "I think I may have PMDD",
        description: "You experience severe luteal mood crashes and need grounding.",
    },
    {
        value: "loved-one",
        title: "I love someone with PMDD",
        description: "You want to understand their cycle and be their safe space.",
    },
    {
        value: "explore",
        title: "I want to explore more shield apps",
        description: "You are curious about cycle-based emotional safety and grounding toolkits.",
    },
] as const;

const ProfileSetupStepSeven = () => {
    return (
        <ProfileSetupStep
            currentStep={5}
            totalSteps={6}
            title="Who are we building this shield for?"
            centerTitle={true}
            onBack={() => router.back()}
            onContinue={() => router.push("/profile-setup/step-8")}
        >
            <View className="gap-y-3">
                {AUDIENCE_OPTIONS.map((option) => (
                    <View
                        key={option.value}
                        className="rounded-2xl border border-transparent bg-white px-4 py-4 shadow-md shadow-black/5"
                    >
                        <View className="flex-row items-start">
                            <View className="flex-1">
                                <Text className="paragraph-semibold text-dark-100 mb-1">{option.title}</Text>
                                <Text className="body-regular text-gray-200">{option.description}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepSeven;
