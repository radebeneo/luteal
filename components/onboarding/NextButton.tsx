import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

interface NextButtonProps {
    onPress: () => void;
}

const NextButton = ({ onPress }: NextButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="self-center">
            <View className="size-24 flex-center rounded-full bg-[#D9BEEA]/30">
                <View className="size-16 flex-center rounded-full bg-[#B98FD9]">
                    <View className="size-11 flex-center rounded-full bg-[#241B2E]">
                        <Feather name="arrow-right" size={20} color="white" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default NextButton;
