import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

const ProfileSetupStepOne = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const { user } = useUser();
    const [name, setName] = useState(answers.name);
    const inputRef = useRef<TextInput>(null);

    const handleContinue = async () => {
        const trimmedName = name.trim();
        setAnswer("name", trimmedName);

        // Keep the Clerk profile in sync since this name represents the user's identity.
        if (user && user.fullName !== trimmedName) {
            const [firstName, ...rest] = trimmedName.split(/\s+/);
            await user.update({ firstName, lastName: rest.join(" ") || undefined });
        }

        router.push("/profile-setup/step-2");
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
            <ProfileSetupStep
                currentStep={1}
                totalSteps={7}
                title="Tell Us Your Name"
                onBack={() => router.replace("/(auth)/welcome")}
                onContinue={handleContinue}
                continueDisabled={name.trim().length === 0}
            >
                <View className="bg-white rounded-2xl shadow-md shadow-black/5">
                    <TextInput
                        ref={inputRef}
                        autoFocus
                        value={name}
                        onChangeText={setName}
                        placeholder="Your name"
                        placeholderTextColor="#9C97A3"
                        className="paragraph-semibold text-dark-100 text-center py-6"
                    />
                </View>
            </ProfileSetupStep>
        </KeyboardAvoidingView>
    );
};

export default ProfileSetupStepOne;
