import AuthLoading from "@/components/auth/AuthLoading";
import { AuthError, AuthPage } from "@/components/auth/AuthPage";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { getAuthErrorMessage, isValidEmailAddress } from "@/lib/authUtils";
import { useSignUp } from "@clerk/expo";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SignUpScreen = () => {
    const { signUp, fetchStatus } = useSignUp();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [resendIn, setResendIn] = useState(0);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const isLoading = fetchStatus === "fetching";

    useEffect(() => {
        if (resendIn <= 0) return;
        const timer = setTimeout(() => setResendIn((seconds) => seconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendIn]);

    const finishSignUp = async () => {
        if (!signUp) return;
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
            setError(getAuthErrorMessage(finalizeError, "Your account is ready, but we couldn't sign you in. Please try again."));
            return;
        }
        router.replace("/onboarding");
    };

    const handleCreateAccount = async () => {
        if (!signUp || isLoading) return;
        const nextErrors: Record<string, string> = {};
        const names = fullName.trim().split(/\s+/);
        if (fullName.trim().length < 2) nextErrors.fullName = "Enter your name to continue.";
        if (!isValidEmailAddress(email)) nextErrors.email = "Enter a valid email address.";
        if (password.length < 15) nextErrors.password = "Use at least 15 characters.";
        setFieldErrors(nextErrors);
        setError("");
        if (Object.keys(nextErrors).length) return;

        const { error: createError } = await signUp.password({
            emailAddress: email.trim(),
            password,
            firstName: names[0],
            lastName: names.slice(1).join(" ") || undefined,
        });
        if (createError) {
            setError(getAuthErrorMessage(createError, "We couldn't create your account. Check your details and try again."));
            return;
        }

        if (signUp.status === "complete") {
            await finishSignUp();
            return;
        }

        const { error: sendError } = await signUp.verifications.sendEmailCode();
        if (sendError) {
            setError(getAuthErrorMessage(sendError, "We couldn't send your verification code. Please try again."));
            return;
        }
        setIsVerifying(true);
        setResendIn(30);
    };

    const handleVerifyEmail = async () => {
        if (!signUp || isLoading || code.trim().length < 4) return;
        setError("");
        const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code: code.trim() });
        if (verifyError) {
            setError(getAuthErrorMessage(verifyError, "That code didn't work. Check it and try again."));
            return;
        }
        if (signUp.status !== "complete") {
            setError("Your email is verified, but a required account detail is missing. Please contact support.");
            return;
        }
        await finishSignUp();
    };

    const handleResendCode = async () => {
        if (!signUp || isLoading || resendIn > 0) return;
        setError("");
        const { error: sendError } = await signUp.verifications.sendEmailCode();
        if (sendError) {
            setError(getAuthErrorMessage(sendError, "We couldn't resend the code. Please try again."));
            return;
        }
        setResendIn(30);
    };

    if (!signUp) return <AuthLoading />;

    return (
        <AuthPage
            title={isVerifying ? "Check your email" : "Start with you"}
            subtitle={isVerifying ? `Enter the verification code sent to ${email.trim()}.` : "Create a private space for your cycle."}
            onBack={isVerifying ? () => { setIsVerifying(false); setError(""); } : undefined}
            footer={
                <View className="flex-row justify-center">
                    <Text className="body-regular text-gray-200">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")} accessibilityRole="button">
                        <Text className="body-medium text-dark-100">Sign in</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            {error ? <AuthError message={error} /> : null}
            {!isVerifying ? (
                <>
                    <View className="mb-4">
                        <CustomInput
                            label="Full name"
                            placeholder="Your name"
                            variant="pill"
                            value={fullName}
                            onChangeText={(value) => { setFullName(value); setFieldErrors((current) => ({ ...current, fullName: "" })); }}
                            autoCapitalize="words"
                            autoComplete="name"
                            textContentType="name"
                            returnKeyType="next"
                            icon={<Feather name="user" size={17} color="#9C97A3" />}
                            error={fieldErrors.fullName}
                        />
                    </View>
                    <View className="mb-4">
                        <CustomInput
                            label="Email"
                            placeholder="you@example.com"
                            variant="pill"
                            value={email}
                            onChangeText={(value) => { setEmail(value); setFieldErrors((current) => ({ ...current, email: "" })); }}
                            keyboardType="email-address"
                            autoComplete="email"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            icon={<Feather name="mail" size={17} color="#9C97A3" />}
                            error={fieldErrors.email}
                        />
                    </View>
                    <View className="mb-5">
                        <CustomInput
                            label="Password"
                            placeholder="At least 15 characters"
                            variant="pill"
                            value={password}
                            onChangeText={(value) => { setPassword(value); setFieldErrors((current) => ({ ...current, password: "" })); }}
                            secureTextEntry={!showPassword}
                            autoComplete="new-password"
                            textContentType="newPassword"
                            returnKeyType="done"
                            icon={<Feather name="lock" size={17} color="#9C97A3" />}
                            rightIcon={<Feather name={showPassword ? "eye-off" : "eye"} size={17} color="#9C97A3" />}
                            rightIconLabel={showPassword ? "Hide password" : "Show password"}
                            onRightIconPress={() => setShowPassword((visible) => !visible)}
                            error={fieldErrors.password}
                        />
                    </View>
                    <CustomButton title="Create account" onPress={handleCreateAccount} isLoading={isLoading} />
                    <SocialAuthButtons mode="sign-up" destination="/onboarding" disabled={isLoading} />
                </>
            ) : (
                <>
                    <CustomInput
                        label="Verification code"
                        placeholder="6-digit code"
                        variant="pill"
                        value={code}
                        onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
                        keyboardType="numeric"
                        autoComplete="one-time-code"
                        textContentType="oneTimeCode"
                        returnKeyType="done"
                        maxLength={6}
                        accessibilityLabel="Email verification code"
                        icon={<Feather name="key" size={17} color="#9C97A3" />}
                    />
                    <CustomButton title="Verify email" onPress={handleVerifyEmail} isLoading={isLoading} disabled={code.trim().length < 4} style="mt-5" />
                    <TouchableOpacity onPress={handleResendCode} disabled={isLoading || resendIn > 0} className="mt-4 items-center py-2" accessibilityRole="button">
                        <Text className={resendIn > 0 ? "body-regular text-gray-200" : "body-medium text-plum"}>
                            {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
                        </Text>
                    </TouchableOpacity>
                    <View className="mt-2 flex-row items-center justify-center">
                        <Feather name="shield" size={14} color="#878787" />
                        <Text className="small-bold ml-1.5 text-gray-200">Email verification helps protect your account.</Text>
                    </View>
                </>
            )}
        </AuthPage>
    );
};

export default SignUpScreen;