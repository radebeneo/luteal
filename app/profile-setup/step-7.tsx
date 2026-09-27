import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

const ProfileSetupStepSeven = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const [date, setDate] = useState(answers.lastPeriodStart ?? "");

    return (
        <ProfileSetupStep
            currentStep={7}
            totalSteps={7}
            title="Enter the Start Date of Your Last Period"
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("lastPeriodStart", date.trim() || null);
                router.push("/profile-setup/preparing");
            }}
            continueDisabled={date.trim().length === 0}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5">
                <TextInput
                    autoFocus
                    value={date}
                    onChangeText={setDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9C97A3"
                    keyboardType="numbers-and-punctuation"
                    className="paragraph-semibold text-dark-100 text-center py-6"
                />
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepSeven;
