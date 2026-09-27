import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

const ProfileSetupStepFive = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const [days, setDays] = useState(answers.periodLengthDays ? String(answers.periodLengthDays) : "");

    return (
        <ProfileSetupStep
            currentStep={5}
            totalSteps={7}
            title="Length of Your Period"
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("periodLengthDays", days ? Number(days) : null);
                router.push("/profile-setup/step-6");
            }}
            continueDisabled={days.trim().length === 0}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5">
                <TextInput
                    autoFocus
                    value={days}
                    onChangeText={setDays}
                    placeholder="Number of days"
                    placeholderTextColor="#9C97A3"
                    keyboardType="numeric"
                    className="paragraph-semibold text-dark-100 text-center py-6"
                />
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepFive;
