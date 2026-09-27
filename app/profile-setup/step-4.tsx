import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

const ProfileSetupStepFour = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const [height, setHeight] = useState(answers.heightCm ? String(answers.heightCm) : "");

    return (
        <ProfileSetupStep
            currentStep={4}
            totalSteps={7}
            title="Tell Us Your Height"
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("heightCm", height ? Number(height) : null);
                router.push("/profile-setup/step-5");
            }}
            continueDisabled={height.trim().length === 0}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5">
                <TextInput
                    autoFocus
                    value={height}
                    onChangeText={setHeight}
                    placeholder="Height in cm"
                    placeholderTextColor="#9C97A3"
                    keyboardType="numeric"
                    className="paragraph-semibold text-dark-100 text-center py-6"
                />
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepFour;
