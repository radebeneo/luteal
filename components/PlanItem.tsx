import { images } from "@/constants";
import { usePocketStore } from "@/store/pocket.store";
import { PlanItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

// A saved affirmation / support-plan item, with remove instead of quantity math
const PlanItem = ({ item }: { item: PlanItemType }) => {
    const { removeItem } = usePocketStore();

    return (
        <View className="plan-item">
            <View className="flex flex-row items-center gap-x-3 flex-1">
                <View className="plan-item__image">
                    <Image source={images.star} className="size-1/2" resizeMode="contain" tintColor="#B98CDD" />
                </View>

                <View className="flex-1">
                    <Text className="base-bold text-dark-100">{item.title}</Text>
                    <Text className="body-regular text-gray-200 mt-1">{item.body}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id)} className="flex-center">
                <Image source={images.trash} className="size-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default PlanItem;
