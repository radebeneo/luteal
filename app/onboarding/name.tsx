import CustomButton from "@/components/CustomButton";
import OnboardingHeader from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NameStep = () => {
    const { answers, setAnswer } = useOnboardingStore();
    const [name, setName] = useState(answers.name);

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 px-5 pt-4">
                <OnboardingHeader step={1} total={7} />
                <Text className="h1-bold text-dark-100 mb-8">Tell Us Your Name</Text>

                <View className="bg-white rounded-2xl shadow-md shadow-black/5 mb-6">
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Your name"
                        className="paragraph-semibold text-dark-100 text-center py-5"
                    />
                </View>

                <View className="flex-1" />

                <CustomButton
                    title="Continue"
                    onPress={() => {
                        setAnswer("name", name.trim());
                        router.push("/onboarding/birthday");
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default NameStep;
