import AuthLoading from "@/components/auth/AuthLoading";
import { AuthError, AuthPage } from "@/components/auth/AuthPage";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { getAuthErrorMessage, isValidEmailAddress } from "@/lib/authUtils";
import { useSignIn } from "@clerk/expo";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SignInMode = "credentials" | "reset-code" | "new-password" | "mfa";
type MfaStrategy = "email_code" | "phone_code" | "totp" | "backup_code";

const supportedMfaStrategies: MfaStrategy[] = ["email_code", "phone_code", "totp", "backup_code"];

const SignInScreen = () => {
    const { signIn, fetchStatus } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState<SignInMode>("credentials");
    const [mfaStrategy, setMfaStrategy] = useState<MfaStrategy | null>(null);
    const [error, setError] = useState("");
    const [fieldError, setFieldError] = useState("");
    const isLoading = fetchStatus === "fetching";
    const availableMfaStrategies = signIn?.supportedSecondFactors.flatMap(({ strategy }) =>
        supportedMfaStrategies.includes(strategy as MfaStrategy) ? [strategy as MfaStrategy] : [],
    ) ?? [];

    const finalizeSignIn = async () => {
        if (!signIn || signIn.status !== "complete") return;
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
            setError(getAuthErrorMessage(finalizeError, "Your details are correct, but we couldn't finish signing you in."));
            return;
        }
        router.replace("/(tabs)");
    };

    const sendMfaCode = async (strategy: MfaStrategy) => {
        if (!signIn) return;
        setError("");
        setCode("");
        setMfaStrategy(strategy);
        if (strategy === "email_code") {
            const { error: sendError } = await signIn.mfa.sendEmailCode();
            if (sendError) setError(getAuthErrorMessage(sendError, "We couldn't send your email code."));
        }
        if (strategy === "phone_code") {
            const { error: sendError } = await signIn.mfa.sendPhoneCode();
            if (sendError) setError(getAuthErrorMessage(sendError, "We couldn't send your text message code."));
        }
    };

    const startMfa = async () => {
        if (!signIn) return;
        const preferredStrategy = (["email_code", "phone_code", "totp", "backup_code"] as MfaStrategy[])
            .find((strategy) => availableMfaStrategies.includes(strategy));
        if (!preferredStrategy) {
            setError("This account requires a verification method that isn't available here. Try another sign-in method.");
            return;
        }
        setMode("mfa");
        await sendMfaCode(preferredStrategy);
    };

    const handleSignIn = async () => {
        if (!signIn || isLoading) return;
        setError("");
        if (!isValidEmailAddress(email)) {
            setFieldError("Enter a valid email address.");
            return;
        }
        setFieldError("");
        if (password.length < 8) {
            setFieldError("Use at least 8 characters.");
            return;
        }
        const { error: signInError } = await signIn.password({ emailAddress: email.trim(), password });
        if (signInError) {
            setError(getAuthErrorMessage(signInError, "We couldn't sign you in. Check your email and password."));
            return;
        }
        if (signIn.status === "complete") {
            await finalizeSignIn();
            return;
        }
        if (signIn.status === "needs_second_factor") {
            await startMfa();
            return;
        }
        setError("Your account needs another sign-in step. Please try again.");
    };

    const startPasswordReset = async () => {
        if (!signIn || isLoading) return;
        setError("");
        if (!isValidEmailAddress(email)) {
            setFieldError("Enter the email address for your account.");
            return;
        }
        setFieldError("");
        const { error: createError } = await signIn.create({ identifier: email.trim() });
        if (createError) {
            setError(getAuthErrorMessage(createError, "We couldn't start password recovery. Check your email and try again."));
            return;
        }
        const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
        if (sendError) {
            setError(getAuthErrorMessage(sendError, "We couldn't send a recovery code. Please try again."));
            return;
        }
        setMode("reset-code");
    };

    const verifyRecoveryCode = async () => {
        if (!signIn || isLoading || !code.trim()) return;
        setError("");
        const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({ code: code.trim() });
        if (verifyError) {
            setError(getAuthErrorMessage(verifyError, "That recovery code didn't work. Check it and try again."));
            return;
        }
        setMode("new-password");
        setCode("");
    };

    const submitNewPassword = async () => {
        if (!signIn || isLoading) return;
        setError("");
        if (newPassword.length < 15) {
            setFieldError("Use at least 15 characters for your new password.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setFieldError("Your passwords don't match.");
            return;
        }
        setFieldError("");
        const { error: resetError } = await signIn.resetPasswordEmailCode.submitPassword({ password: newPassword });
        if (resetError) {
            setError(getAuthErrorMessage(resetError, "We couldn't update your password. Please try again."));
            return;
        }
        if (signIn.status === "complete") {
            await finalizeSignIn();
            return;
        }
        setError("Your password was updated, but sign-in needs another step. Please sign in with your new password.");
        setMode("credentials");
        setPassword("");
    };

    const verifyMfa = async () => {
        if (!signIn || !mfaStrategy || !code.trim() || isLoading) return;
        setError("");
        let verifyError = null;
        if (mfaStrategy === "email_code") ({ error: verifyError } = await signIn.mfa.verifyEmailCode({ code: code.trim() }));
        if (mfaStrategy === "phone_code") ({ error: verifyError } = await signIn.mfa.verifyPhoneCode({ code: code.trim() }));
        if (mfaStrategy === "totp") ({ error: verifyError } = await signIn.mfa.verifyTOTP({ code: code.trim() }));
        if (mfaStrategy === "backup_code") ({ error: verifyError } = await signIn.mfa.verifyBackupCode({ code: code.trim() }));
        if (verifyError) {
            setError(getAuthErrorMessage(verifyError, "That code didn't work. Check it and try again."));
            return;
        }
        if (signIn.status === "complete") await finalizeSignIn();
        else setError("Verification is incomplete. Try another code or choose a different method.");
    };

    if (!signIn) return <AuthLoading />;

    const titles: Record<SignInMode, [string, string]> = {
        credentials: ["Welcome back", "Sign in and keep your cycle in view."],
        "reset-code": ["Check your email", `Enter the recovery code sent to ${email.trim()}.`],
        "new-password": ["Choose a new password", "Use a password you haven't used here before."],
        mfa: ["One more step", "Verify it's really you to finish signing in."],
    };

    return (
        <AuthPage
            title={titles[mode][0]}
            subtitle={titles[mode][1]}
            onBack={mode === "credentials" ? undefined : () => { setMode("credentials"); setError(""); setCode(""); }}
            footer={
                <View className="flex-row justify-center">
                    <Text className="body-regular text-gray-200">New to Luteal Shield? </Text>
                    <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")} accessibilityRole="button">
                        <Text className="body-medium text-dark-100">Create an account</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            {error ? <AuthError message={error} /> : null}
            {mode === "credentials" ? (
                <>
                    <View className="mb-4">
                        <CustomInput
                            label="Email"
                            placeholder="you@example.com"
                            variant="pill"
                            value={email}
                            onChangeText={(value) => { setEmail(value); setFieldError(""); }}
                            keyboardType="email-address"
                            autoComplete="email"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            icon={<Feather name="mail" size={17} color="#9C97A3" />}
                            error={fieldError && !isValidEmailAddress(email) ? fieldError : undefined}
                        />
                    </View>
                    <View className="mb-2">
                        <CustomInput
                            label="Password"
                            placeholder="Your password"
                            variant="pill"
                            value={password}
                            onChangeText={(value) => { setPassword(value); setFieldError(""); }}
                            secureTextEntry={!showPassword}
                            autoComplete="current-password"
                            textContentType="password"
                            returnKeyType="done"
                            icon={<Feather name="lock" size={17} color="#9C97A3" />}
                            rightIcon={<Feather name={showPassword ? "eye-off" : "eye"} size={17} color="#9C97A3" />}
                            rightIconLabel={showPassword ? "Hide password" : "Show password"}
                            onRightIconPress={() => setShowPassword((visible) => !visible)}
                            error={fieldError && isValidEmailAddress(email) ? fieldError : undefined}
                        />
                    </View>
                    <TouchableOpacity onPress={startPasswordReset} className="mb-5 self-end py-2" accessibilityRole="button">
                        <Text className="body-medium text-plum">Forgot password?</Text>
                    </TouchableOpacity>
                    <CustomButton title="Sign in" onPress={handleSignIn} isLoading={isLoading} />
                </>
            ) : null}

            {mode === "reset-code" ? (
                <>
                    <CustomInput
                        label="Recovery code"
                        placeholder="6-digit code"
                        variant="pill"
                        value={code}
                        onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
                        keyboardType="numeric"
                        autoComplete="one-time-code"
                        textContentType="oneTimeCode"
                        maxLength={6}
                        returnKeyType="done"
                        icon={<Feather name="key" size={17} color="#9C97A3" />}
                    />
                    {fieldError ? <Text className="small-bold mt-2 text-error">{fieldError}</Text> : null}
                    <CustomButton title="Verify code" onPress={verifyRecoveryCode} isLoading={isLoading} disabled={!code.trim()} style="mt-5" />
                    <TouchableOpacity onPress={startPasswordReset} disabled={isLoading} className="mt-3 items-center py-2" accessibilityRole="button">
                        <Text className="body-medium text-plum">Resend recovery code</Text>
                    </TouchableOpacity>
                </>
            ) : null}

            {mode === "new-password" ? (
                <>
                    <CustomInput
                        label="New password"
                        placeholder="At least 15 characters"
                        variant="pill"
                        value={newPassword}
                        onChangeText={(value) => { setNewPassword(value); setFieldError(""); }}
                        secureTextEntry={!showPassword}
                        autoComplete="new-password"
                        textContentType="newPassword"
                        icon={<Feather name="lock" size={17} color="#9C97A3" />}
                    />
                    <View className="mt-4">
                        <CustomInput
                            label="Confirm new password"
                            placeholder="Enter it again"
                            variant="pill"
                            value={confirmPassword}
                            onChangeText={(value) => { setConfirmPassword(value); setFieldError(""); }}
                            secureTextEntry={!showPassword}
                            autoComplete="new-password"
                            textContentType="newPassword"
                            icon={<Feather name="lock" size={17} color="#9C97A3" />}
                            error={fieldError || undefined}
                        />
                    </View>
                    <CustomButton title="Update password" onPress={submitNewPassword} isLoading={isLoading} style="mt-5" />
                </>
            ) : null}

            {mode === "mfa" ? (
                <>
                    {availableMfaStrategies.length > 1 ? (
                        <View className="mb-4 flex-row flex-wrap gap-2">
                            {availableMfaStrategies.map((strategy) => (
                                <TouchableOpacity
                                    key={strategy}
                                    onPress={() => sendMfaCode(strategy)}
                                    className={mfaStrategy === strategy ? "rounded-full bg-plum px-3 py-2" : "rounded-full border border-gray-200 px-3 py-2"}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: mfaStrategy === strategy }}
                                >
                                    <Text className={mfaStrategy === strategy ? "small-bold text-white" : "small-bold text-dark-100"}>
                                        {strategy === "email_code" ? "Email code" : strategy === "phone_code" ? "Text message" : strategy === "totp" ? "Authenticator" : "Backup code"}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : null}
                    <CustomInput
                        label={mfaStrategy === "totp" ? "Authenticator code" : mfaStrategy === "backup_code" ? "Backup code" : "Verification code"}
                        placeholder={mfaStrategy === "backup_code" ? "Enter a backup code" : "Enter your code"}
                        variant="pill"
                        value={code}
                        onChangeText={(value) => setCode(mfaStrategy === "backup_code" ? value.trimStart() : value.replace(/\D/g, "").slice(0, 6))}
                        keyboardType={mfaStrategy === "backup_code" ? "default" : "numeric"}
                        autoComplete="one-time-code"
                        textContentType="oneTimeCode"
                        maxLength={mfaStrategy === "backup_code" ? 24 : 6}
                        returnKeyType="done"
                        icon={<Feather name="key" size={17} color="#9C97A3" />}
                    />
                    <CustomButton title="Verify and sign in" onPress={verifyMfa} isLoading={isLoading} disabled={!code.trim()} style="mt-5" />
                    {(mfaStrategy === "email_code" || mfaStrategy === "phone_code") ? (
                        <TouchableOpacity onPress={() => mfaStrategy && sendMfaCode(mfaStrategy)} disabled={isLoading} className="mt-3 items-center py-2" accessibilityRole="button">
                            <Text className="body-medium text-plum">Send a new code</Text>
                        </TouchableOpacity>
                    ) : null}
                </>
            ) : null}
        </AuthPage>
    );
};

export default SignInScreen;