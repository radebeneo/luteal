import CustomButton from "@/components/CustomButton";
import SegmentedProgressBar from "@/components/profile-setup/SegmentedProgressBar";
import { images } from "@/constants";
import type { ReactNode } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileSetupStepProps = {
    currentStep: number;
    totalSteps: number;
    title: string;
    onBack: () => void;
    onContinue: () => void;
    continueDisabled?: boolean;
    continueLabel?: string;
    children: ReactNode;
};

const ProfileSetupStep = ({
    currentStep,
    totalSteps,
    title,
    onBack,
    onContinue,
    continueDisabled = false,
    continueLabel = "Continue",
    children,
}: ProfileSetupStepProps) => {
    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <View className="flex-1 px-5 pt-4">
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity
                        className="size-10 rounded-xl bg-blush-100 flex-center"
                        onPress={onBack}
                        accessibilityRole="button"
                        accessibilityLabel="Back"
                    >
                        <Image source={images.arrowBack} className="size-4" resizeMode="contain" />
                    </TouchableOpacity>

                    <View className="flex-1 mx-4">
                        <SegmentedProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                    </View>

                    <Text className="paragraph-medium text-dark-100">
                        {currentStep} / {totalSteps}
                    </Text>
                </View>

                <Text className="h1-bold text-dark-100 mb-8">{title}</Text>

                <View className="flex-1">{children}</View>

                <CustomButton title={continueLabel} onPress={onContinue} disabled={continueDisabled} />
            </View>
        </SafeAreaView>
    );
};

export default ProfileSetupStep;
