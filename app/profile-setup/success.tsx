import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useCompleteProfileSetup } from "@/lib/useCompleteProfileSetup";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSetupSuccess = () => {
    const completeProfileSetup = useCompleteProfileSetup();

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <View className="flex-1 items-center justify-center px-5">
                <View className="bg-white rounded-3xl p-8 items-center w-full shadow-md shadow-black/10">
                    <View className="size-20 rounded-full bg-primary/20 flex-center mb-4">
                        <View className="size-14 rounded-full bg-primary flex-center">
                            <Image source={images.check} className="size-6" resizeMode="contain" tintColor="#ffffff" />
                        </View>
                    </View>

                    <Text className="h3-bold text-dark-100 mb-2">Setup Complete</Text>
                    <Text className="body-regular text-gray-200 text-center mb-6">
                        Your personal calendar is ready.
                    </Text>

                    <CustomButton title="Back to Home" onPress={completeProfileSetup} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileSetupSuccess;
