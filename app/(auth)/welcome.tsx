import { AuthPage } from "@/components/auth/AuthPage";
import CustomButton from "@/components/CustomButton";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const AuthEntry = () => {
    return (
        <AuthPage title="Feel more in tune" subtitle="A little more care, through every phase." showBack={false}>
            <CustomButton title="Create your account" onPress={() => router.push("/(auth)/sign-up")} style="mb-3" />
            <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-in")}
                className="h-14 items-center justify-center rounded-full border border-plum"
                accessibilityRole="button"
            >
                <Text className="paragraph-semibold text-plum">I already have an account</Text>
            </TouchableOpacity>
            <View className="mt-5 flex-row items-center justify-center">
                <Feather name="lock" size={13} color="#878787" />
                <Text className="small-bold ml-1.5 text-gray-200">Your account is protected by Clerk.</Text>
            </View>
        </AuthPage>
    );
};

export default AuthEntry;