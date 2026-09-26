import { images } from "@/constants";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

// Floating action button on Home that opens the Bloomy chat companion
const BloomyButton = () => {
    return (
        <TouchableOpacity className="bloomy-btn" onPress={() => router.push("/bloomy")}>
            <Image source={images.star} className="size-5" resizeMode="contain" tintColor="#ffffff" />
        </TouchableOpacity>
    );
};
export default BloomyButton;
