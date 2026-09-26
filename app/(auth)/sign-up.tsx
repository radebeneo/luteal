import CustomButton from "@/components/CustomButton";
import { useGoogleSSO } from "@/lib/googleAuth";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpEntry = () => {
    const { signInWithGoogle } = useGoogleSSO();

    return (
        <SafeAreaView className="flex-1 bg-[#F3F2F5]">
            <View className="px-5 pt-2">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="size-11 rounded-2xl bg-white items-center justify-center shadow-sm shadow-black/10"
                >
                    <Feather name="chevron-left" size={22} color="#3F2E45" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center px-6">
                <View className="w-full bg-white rounded-3xl p-8 shadow-md shadow-black/10">
                    <Text className="h1-bold text-dark-100 text-center mb-2">Sign Up</Text>
                    <Text className="body-regular text-gray-200 text-center mb-8">
                        Time to access your account.
                    </Text>

                    <CustomButton
                        title="Continue With Google"
                        onPress={signInWithGoogle}
                        style="custom-btn-outline mb-4"
                        textStyle="text-dark-100"
                        leftIcon={
                            <View className="mr-2">
                                <FontAwesome name="google" size={18} color="#4285F4" />
                            </View>
                        }
                    />

                    <CustomButton
                        title="Sign up"
                        onPress={() => router.push("/(auth)/sign-up-form")}
                        style="mb-4"
                    />

                    <CustomButton
                        title="Sign in"
                        onPress={() => router.push("/(auth)/sign-in")}
                        style="custom-btn-outline"
                        textStyle="text-plum"
                    />
                </View>
            </View>

            <View className="flex-row justify-center gap-6 pb-8">
                {/* No destination URL provided yet — wire these up once Privacy Policy / Terms pages exist */}
                <TouchableOpacity>
                    <Text className="body-regular text-gray-200">Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className="body-regular text-gray-200">Terms of Service</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default SignUpEntry;
