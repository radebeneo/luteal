import CustomButton from "@/components/CustomButton";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Placeholder screen — no mockup has been provided yet for sign-in.
// Replace with the real design once it's attached.
const SignInStub = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F3F2F5]">
            <View className="px-5 pt-2">
                <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
                    <Feather name="chevron-left" size={24} color="#3F2E45" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center px-6">
                <View className="w-full bg-white rounded-3xl p-8 shadow-md shadow-black/10">
                    <Text className="h1-bold text-dark-100 text-center mb-2">Sign In</Text>
                    <Text className="body-regular text-gray-200 text-center mb-8">
                        This screen is a placeholder until the sign-in mockup is provided.
                    </Text>

                    <CustomButton title="Back to Sign Up" onPress={() => router.replace("/(auth)/sign-up")} />
                </View>
            </View>
        </SafeAreaView>
    );
};
export default SignInStub;
