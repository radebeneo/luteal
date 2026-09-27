import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import WheelPicker, { WHEEL_ITEM_HEIGHT } from "@/components/profile-setup/WheelPicker";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const CYCLE_LENGTHS = Array.from({ length: 46 }, (_, index) => String(index + 15));

const ProfileSetupStepSix = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const initialLength = answers.cycleLengthDays ?? 28;
    const [selectedIndex, setSelectedIndex] = useState(
        Math.max(0, Math.min(CYCLE_LENGTHS.length - 1, initialLength - 15))
    );

    return (
        <ProfileSetupStep
            currentStep={4}
            totalSteps={6}
            title="Enter Your Cycle Length"
            centerContent
            scrollEnabled={false}
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("cycleLengthDays", Number(CYCLE_LENGTHS[selectedIndex]));
                router.push("/profile-setup/step-7");
            }}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5 relative">
                <View className="flex-row items-center justify-center">
                    <WheelPicker
                        data={CYCLE_LENGTHS}
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                        width={110}
                    />
                    <View
                        pointerEvents="none"
                        className="absolute left-0 right-0 border-t border-b border-gray-200/40"
                        style={{ top: WHEEL_ITEM_HEIGHT * 2, height: WHEEL_ITEM_HEIGHT }}
                    />
                </View>
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepSix;
