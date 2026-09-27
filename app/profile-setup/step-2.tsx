import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

// No date-picker dependency is installed yet, so this uses a plain text field (YYYY-MM-DD).
const ProfileSetupStepTwo = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const [birthday, setBirthday] = useState(answers.birthday);

    return (
        <ProfileSetupStep
            currentStep={2}
            totalSteps={7}
            title="Tell Us Your Birthday"
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("birthday", birthday.trim());
                router.push("/profile-setup/step-3");
            }}
            continueDisabled={birthday.trim().length === 0}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5">
                <TextInput
                    autoFocus
                    value={birthday}
                    onChangeText={setBirthday}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9C97A3"
                    keyboardType="numbers-and-punctuation"
                    className="paragraph-semibold text-dark-100 text-center py-6"
                />
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepTwo;
