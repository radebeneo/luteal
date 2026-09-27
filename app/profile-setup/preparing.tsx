import { router } from "expo-router";
import ProfileSetupDecoration from "@/components/profile-setup/ProfileSetupDecoration";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSetupPreparing = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => (p >= 100 ? p : p + 10));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            router.replace("/profile-setup/success");
        }
    }, [progress]);

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <View className="flex-1 px-5 pt-4">
                <Text className="h1-bold text-dark-100 mb-3 text-center">
                    Preparing your{"\n"}personal calendar...
                </Text>
                <ProfileSetupDecoration />

                <View className="flex-1 items-center justify-center">
                    <View
                        className="flex-center rounded-full border-8"
                        style={{ width: 200, height: 200, borderColor: "#3F2E45" }}
                    >
                        <Text className="h1-bold text-dark-100">{progress}%</Text>
                    </View>
                </View>

                <Text className="text-center body-regular text-gray-200 mb-10">
                    This won&apos;t take long.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default ProfileSetupPreparing;
