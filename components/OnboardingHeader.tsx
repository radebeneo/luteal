import { images } from "@/constants";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const OnboardingHeader = ({ step, total }: { step: number; total: number }) => {
    return (
        <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity
                className="size-10 rounded-xl bg-blush-100 flex-center"
                onPress={() => router.back()}
            >
                <Image source={images.arrowBack} className="size-4" resizeMode="contain" />
            </TouchableOpacity>

            <View className="flex-1 flex-row gap-x-1.5 mx-4">
                {Array.from({ length: total }).map((_, i) => (
                    <View
                        key={i}
                        className="flex-1 h-1.5 rounded-full"
                        style={{ backgroundColor: i < step ? "#3F2E45" : "#FBD9E3" }}
                    />
                ))}
            </View>

            <Text className="paragraph-medium text-dark-100">{step} / {total}</Text>
        </View>
    );
};
export default OnboardingHeader;
