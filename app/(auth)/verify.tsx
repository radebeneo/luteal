import CustomButton from "@/components/CustomButton";
import { useSignUp } from "@clerk/expo";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Placeholder screen — no mockup has been provided yet for email verification.
// Swap this out once the real design lands; wiring below is functional in the meantime.
const VerifyEmail = () => {
    const { signUp, errors, fetchStatus } = useSignUp();
    const [code, setCode] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");
    const verificationInProgress = useRef(false);

    const isLoading = fetchStatus === "fetching";

    const finalizeIfComplete = async () => {
        if (signUp.status !== "complete") return false;

        await signUp.finalize({
            navigate: () => router.replace("/(tabs)"),
        });
        return true;
    };

    const handleVerify = async () => {
        if (!code.trim() || isLoading || verificationInProgress.current) return;

        if (await finalizeIfComplete()) return;

        verificationInProgress.current = true;
        const { error } = await signUp.verifications.verifyEmailCode({ code: code.trim() });
        if (error) {
            if (await finalizeIfComplete()) return;
            setVerificationMessage("We couldn't verify that code. Check it and try again. If you've had several attempts, please wait before retrying.");
            verificationInProgress.current = false;
            return;
        }

        await finalizeIfComplete();
        verificationInProgress.current = false;
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F2F5]">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1 items-center justify-center px-6"
            >
                <View className="w-full bg-white rounded-3xl p-8 shadow-md shadow-black/10">
                    <Text className="h1-bold text-dark-100 text-center mb-2">Verify Your Email</Text>
                    <Text className="body-regular text-gray-200 text-center mb-8">
                        Enter the code we just emailed you. (Placeholder screen — real design pending.)
                    </Text>

                    <TextInput
                        value={code}
                        onChangeText={(value) => {
                            setCode(value);
                            setVerificationMessage("");
                        }}
                        placeholder="000000"
                        keyboardType="numeric"
                        className="input-pill mb-2 text-center paragraph-semibold"
                        placeholderTextColor="#9C97A3"
                    />
                    {errors.fields.code && (
                        <Text className="small-bold text-error mb-4 text-center">
                            {errors.fields.code.message}
                        </Text>
                    )}
                    {verificationMessage ? (
                        <Text className="small-bold text-error mb-4 text-center">
                            {verificationMessage}
                        </Text>
                    ) : null}

                    <CustomButton
                        title="Verify"
                        onPress={handleVerify}
                        isLoading={isLoading}
                        disabled={!code.trim()}
                        style="mt-4"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default VerifyEmail;
