import CustomButton from "@/components/CustomButton";
import OnboardingHeader from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// No date-picker dependency is installed yet, so this uses a plain text field (YYYY-MM-DD).
const BirthdayStep = () => {
    const { answers, setAnswer } = useOnboardingStore();
    const [birthday, setBirthday] = useState(answers.birthday);

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <View className="flex-1 px-5 pt-4">
                <OnboardingHeader step={2} total={7} />
                <Text className="h1-bold text-dark-100 mb-8">Tell Us Your Birthday</Text>

                <View className="bg-white rounded-2xl shadow-md shadow-black/5 mb-6">
                    <TextInput
                        value={birthday}
                        onChangeText={setBirthday}
                        placeholder="YYYY-MM-DD"
                        keyboardType="numbers-and-punctuation"
                        className="paragraph-semibold text-dark-100 text-center py-5"
                    />
                </View>

                <View className="flex-1" />

                <CustomButton
                    title="Continue"
                    onPress={() => {
                        setAnswer("birthday", birthday.trim());
                        router.push("/onboarding/weight");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
export default BirthdayStep;
