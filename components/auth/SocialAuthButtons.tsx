import { AuthError } from "@/components/auth/AuthPage";
import { useSocialSSO, type SocialProvider } from "@/lib/socialAuth";
import { FontAwesome } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface SocialAuthButtonsProps {
    mode: "sign-in" | "sign-up";
    destination: Href;
    disabled?: boolean;
}

const providers: SocialProvider[] = ["google", "apple"];

const SocialAuthButtons = ({ mode, destination, disabled = false }: SocialAuthButtonsProps) => {
    const { signInWithSocial, loadingProvider, error } = useSocialSSO(destination);

    return (
        <View className="mt-5">
            <View className="mb-4 flex-row items-center">
                <View className="h-px flex-1 bg-gray-100" />
                <Text className="small-bold mx-3 text-gray-200">or continue with</Text>
                <View className="h-px flex-1 bg-gray-100" />
            </View>
            {error ? <AuthError message={error} /> : null}
            <View className={mode === "sign-up" ? "flex-row justify-center gap-6" : "gap-3"}>
                {providers.map((provider) => {
                    const label = provider === "google" ? "Google" : "Apple";
                    const isLoading = loadingProvider === provider;
                    return (
                        <TouchableOpacity
                            key={provider}
                            onPress={() => signInWithSocial(provider)}
                            disabled={disabled || loadingProvider !== null}
                            className={mode === "sign-up"
                                ? "h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white"
                                : "h-14 flex-row items-center justify-center rounded-full border border-gray-100 bg-white"}
                            accessibilityRole="button"
                            accessibilityLabel={`${mode === "sign-in" ? "Sign in" : "Sign up"} with ${label}`}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#3F2E45" />
                            ) : (
                                <>
                                    <FontAwesome name={provider} size={18} color={provider === "apple" ? "#111111" : "#4285F4"} />
                                    {mode === "sign-in" ? <Text className="body-medium ml-2 text-dark-100">Continue with {label}</Text> : null}
                                </>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default SocialAuthButtons;