import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useGoogleSSO } from "@/lib/googleAuth";
import { useSignUp } from "@clerk/expo";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpForm = () => {
    const { signUp, errors, fetchStatus } = useSignUp();
    const { signInWithGoogle } = useGoogleSSO();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const isLoading = fetchStatus === "fetching";
    const canSubmit = fullName.trim().length > 0 && email.trim().length > 0 && password.length >= 15 && agreed && !isLoading;

    const handleSignUp = async () => {
        if (!canSubmit) return;

        const [firstName, ...rest] = fullName.trim().split(/\s+/);
        const lastName = rest.join(" ") || undefined;

        const { error } = await signUp.password({
            emailAddress: email.trim(),
            password,
            firstName,
            lastName,
            legalAccepted: agreed,
        });
        if (error) {
            console.error("Sign-up failed:", JSON.stringify(error, null, 2));
            return;
        }

        await signUp.verifications.sendEmailCode();
        router.push("/(auth)/verify");
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F2F5]">
            <View className="px-5 pt-2">
                <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
                    <Feather name="chevron-left" size={24} color="#3F2E45" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 mt-4 mx-4 bg-white rounded-3xl"
                    contentContainerClassName="p-6"
                    keyboardShouldPersistTaps="handled"
                >
                    <Text className="h1-bold text-dark-100 mb-1">Start Today</Text>
                    <Text className="body-regular text-gray-200 mb-6">
                        Join now to track your cycle.
                    </Text>

                    <View className="mb-4">
                        <CustomInput
                            label="Full Name"
                            variant="pill"
                            placeholder="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            icon={<Feather name="user" size={18} color="#9C97A3" />}
                        />
                        {errors.fields.firstName && (
                            <Text className="small-bold text-error mt-1 pl-2">
                                {errors.fields.firstName.message}
                            </Text>
                        )}
                    </View>

                    <View className="mb-4">
                        <CustomInput
                            label="Email"
                            variant="pill"
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            icon={<Feather name="mail" size={18} color="#9C97A3" />}
                        />
                        {errors.fields.emailAddress && (
                            <Text className="small-bold text-error mt-1 pl-2">
                                {errors.fields.emailAddress.message}
                            </Text>
                        )}
                    </View>

                    <View className="mb-4">
                        <CustomInput
                            label="Password"
                            variant="pill"
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            icon={<Feather name="lock" size={18} color="#9C97A3" />}
                            rightIcon={
                                <Feather
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={18}
                                    color="#9C97A3"
                                />
                            }
                            onRightIconPress={() => setShowPassword((prev) => !prev)}
                        />
                        <Text className="small-regular text-gray-200 mt-1 pl-2">
                            Use at least 15 characters.
                        </Text>
                        {errors.fields.password && (
                            <Text className="small-bold text-error mt-1 pl-2">
                                {errors.fields.password.message}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity
                        onPress={() => setAgreed((prev) => !prev)}
                        className="flex-row items-center mb-6"
                        activeOpacity={0.8}
                    >
                        <View
                            className={
                                agreed
                                    ? "size-5 rounded-md bg-plum items-center justify-center mr-2"
                                    : "size-5 rounded-md border border-gray-200 mr-2"
                            }
                        >
                            {agreed && <Feather name="check" size={14} color="white" />}
                        </View>
                        <Text className="body-regular text-gray-200 flex-1">
                            I agree to Luteal Shield Terms & Conditions.
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Sign up"
                        onPress={handleSignUp}
                        isLoading={isLoading}
                        disabled={!canSubmit}
                    />

                    <Text className="body-regular text-gray-200 text-center my-6">
                        Or continue with
                    </Text>

                    <TouchableOpacity
                        onPress={signInWithGoogle}
                        className="size-14 rounded-full bg-white shadow-md shadow-black/10 items-center justify-center self-center mb-6"
                    >
                        <FontAwesome name="google" size={22} color="#4285F4" />
                    </TouchableOpacity>

                    <View className="flex-row justify-center pb-4">
                        <Text className="body-regular text-gray-200">
                            Already have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
                            <Text className="body-medium text-dark-100 font-quicksand-bold">
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default SignUpForm;
