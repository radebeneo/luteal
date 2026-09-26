import CustomButton from "@/components/CustomButton";
import OnboardingHeader from "@/components/OnboardingHeader";
import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CycleLengthStep = () => {
    const { answers, setAnswer } = useOnboardingStore();
    const [days, setDays] = useState(answers.cycleLengthDays ? String(answers.cycleLengthDays) : "");

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <View className="flex-1 px-5 pt-4">
                <OnboardingHeader step={6} total={7} />
                <Text className="h1-bold text-dark-100 mb-8">Enter Your Cycle Length</Text>

                <View className="bg-white rounded-2xl shadow-md shadow-black/5 mb-6">
                    <TextInput
                        value={days}
                        onChangeText={setDays}
                        placeholder="Number of days"
                        keyboardType="numeric"
                        className="paragraph-semibold text-dark-100 text-center py-5"
                    />
                </View>

                <View className="flex-1" />

                <CustomButton
                    title="Continue"
                    onPress={() => {
                        setAnswer("cycleLengthDays", days ? Number(days) : null);
                        router.push("/onboarding/last-period");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
export default CycleLengthStep;
