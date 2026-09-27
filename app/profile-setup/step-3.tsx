import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

const ProfileSetupStepThree = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const [weight, setWeight] = useState(answers.weightKg ? String(answers.weightKg) : "");

    return (
        <ProfileSetupStep
            currentStep={3}
            totalSteps={7}
            title="Tell Us Your Weight"
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("weightKg", weight ? Number(weight) : null);
                router.push("/profile-setup/step-4");
            }}
            continueDisabled={weight.trim().length === 0}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5">
                <TextInput
                    autoFocus
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Weight in kg"
                    placeholderTextColor="#9C97A3"
                    keyboardType="numeric"
                    className="paragraph-semibold text-dark-100 text-center py-6"
                />
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepThree;
