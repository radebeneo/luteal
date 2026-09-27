import CustomButton from "@/components/CustomButton";
import ProfileSetupDecoration from "@/components/profile-setup/ProfileSetupDecoration";
import SegmentedProgressBar from "@/components/profile-setup/SegmentedProgressBar";
import { images } from "@/constants";
import type { ReactNode } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileSetupStepProps = {
    currentStep: number;
    totalSteps: number;
    title: string;
    onBack: () => void;
    onContinue: () => void;
    continueDisabled?: boolean;
    continueLabel?: string;
    centerTitle?: boolean;
    centerContent?: boolean;
    scrollEnabled?: boolean;
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
    centerTitle = true,
    centerContent = false,
    scrollEnabled = true,
    children,
}: ProfileSetupStepProps) => {
    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
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

                    <Text className={`h1-bold text-dark-100 mb-3${centerTitle ? " text-center" : ""}`}>{title}</Text>
                    <ProfileSetupDecoration />

                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ flexGrow: 1, justifyContent: centerContent ? "center" : undefined }}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        scrollEnabled={scrollEnabled}
                    >
                        {children}
                    </ScrollView>

                    <CustomButton title={continueLabel} onPress={onContinue} disabled={continueDisabled} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ProfileSetupStep;
