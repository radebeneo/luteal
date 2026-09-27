import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const SYMPTOM_GROUPS = [
    {
        title: "EMOTIONAL",
        icon: "heart",
        symptoms: [
            "Rage / irritability",
            "Anxiety",
            "Depression",
            "Emotional numbness",
            "Dissociation",
            "Mood crashes",
            "Shame spirals",
            "Urge to end relationships",
            "Self-harm thoughts",
            "Suicidal thoughts",
            "Feeling like a burden",
            "Feeling like a failure",
            "Feeling like a fraud",
            "Feeling like a monster",
            "Paranoia about loved ones leaving",
        ],
    },
    {
        title: "PHYSICAL & SENSORY",
        icon: "activity",
        symptoms: ["Light sensitivity", "Sound sensitivity", "Brain fog", "Fatigue", "Joint pain", "Headache", "Bloating", "Extreme cravings", "Sleeplessness or insomnia"],
    },
    {
        title: "COGNITIVE",
        icon: "edit-3",
        symptoms: ["Memory lapses", "Difficulty concentrating", "Decision-making paralysis", "Slow thinking", "Confusion", "Overwhelm from simple tasks"],
    },
    {
        title: "RELATIONAL",
        icon: "users",
        symptoms: ["Social withdrawal", "Conflict with loved ones", "Rejection sensitivity", "Urge to isolate completely", "Feeling unlovable / unwanted", "Rage towards loved ones"],
    },
] as const;

const ProfileSetupStepEight = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const [selectedSymptoms, setSelectedSymptoms] = useState(answers.symptoms ?? []);
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((current) =>
            current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]
        );
    };

    const toggleGroup = (title: string) => {
        setExpandedGroups((current) =>
            current.includes(title) ? current.filter((item) => item !== title) : [...current, title]
        );
    };

    return (
        <ProfileSetupStep
            currentStep={6}
            totalSteps={6}
            title="Which symptoms do you experience during your luteal phase?"
            centerTitle={true}
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("symptoms", selectedSymptoms);
                router.push("/profile-setup/preparing");
            }}
        >
            <Text className="body-regular text-gray-200 -mt-4 mb-5">
                Helps us personalise your safety plan and Bloomy&apos;s responses.
            </Text>

            <View className="gap-y-3 pb-4">
                {SYMPTOM_GROUPS.map((group) => {
                    const isExpanded = expandedGroups.includes(group.title);
                    const selectedCount = group.symptoms.filter((symptom) => selectedSymptoms.includes(symptom)).length;

                    return (
                        <View key={group.title}>
                            <Pressable
                                onPress={() => toggleGroup(group.title)}
                                className={`flex-row items-center justify-between rounded-2xl border px-4 py-3.5 ${isExpanded ? "border-plum bg-plum" : "border-blush-200 bg-white"}`}
                                accessibilityRole="button"
                                accessibilityLabel={group.title}
                                accessibilityState={{ expanded: isExpanded }}
                            >
                                <View className="flex-row items-center">
                                    <Feather name={group.icon} size={15} color={isExpanded ? "#FFFFFF" : "#3F2E45"} style={{ marginRight: 8 }} />
                                    <Text className={`small-bold ${isExpanded ? "text-white" : "text-plum"}`}>{group.title}</Text>
                                    {selectedCount > 0 && (
                                        <Text className={`small-bold ml-2 ${isExpanded ? "text-white" : "text-plum"}`}>
                                            ({selectedCount})
                                        </Text>
                                    )}
                                </View>
                                <Feather name={isExpanded ? "chevron-up" : "chevron-down"} size={18} color={isExpanded ? "#FFFFFF" : "#3F2E45"} />
                            </Pressable>

                            {isExpanded && (
                                <View className="flex-row flex-wrap gap-2 mt-3">
                                    {group.symptoms.map((symptom) => {
                                        const isSelected = selectedSymptoms.includes(symptom);

                                        return (
                                            <Pressable
                                                key={symptom}
                                                onPress={() => toggleSymptom(symptom)}
                                                className={`rounded-xl border px-3 py-2 ${isSelected ? "border-plum bg-plum" : "border-blush-200 bg-white"}`}
                                                accessibilityRole="checkbox"
                                                accessibilityLabel={symptom}
                                                accessibilityState={{ checked: isSelected }}
                                            >
                                                <Text className={`paragraph-medium ${isSelected ? "text-white" : "text-dark-100"}`}>
                                                    {symptom}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepEight;