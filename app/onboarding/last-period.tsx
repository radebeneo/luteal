import CustomButton from "@/components/CustomButton";
import OnboardingHeader from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LastPeriodStep = () => {
    const { answers, setAnswer } = useOnboardingStore();
    const [date, setDate] = useState(answers.lastPeriodStart ?? "");

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <View className="flex-1 px-5 pt-4">
                <OnboardingHeader step={7} total={7} />
                <Text className="h1-bold text-dark-100 mb-8">
                    Enter the Start Date of Your Last Period
                </Text>

                <View className="bg-white rounded-2xl shadow-md shadow-black/5 mb-6">
                    <TextInput
                        value={date}
                        onChangeText={setDate}
                        placeholder="YYYY-MM-DD"
                        keyboardType="numbers-and-punctuation"
                        className="paragraph-semibold text-dark-100 text-center py-5"
                    />
                </View>

                <View className="flex-1" />

                <CustomButton
                    title="Continue"
                    onPress={() => {
                        setAnswer("lastPeriodStart", date.trim() || null);
                        router.push("/onboarding/preparing");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
export default LastPeriodStep;
