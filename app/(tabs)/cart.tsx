import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import PlanItem from "@/components/PlanItem";
import { usePocketStore } from "@/store/pocket.store";
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Pocket = () => {

    const {items, getTotalItems, clearPocket} = usePocketStore()

    const totalItems = getTotalItems()

    return (
        <SafeAreaView className="bg-white h-full ">
            <FlatList
                data={items}
                renderItem={({item}) => <PlanItem item={item}/>}
                keyExtractor={(item) => item.id}
                contentContainerClassName="px-5 pt-5 pb-38"
                ListHeaderComponent={() => <CustomHeader title="Your Pocket"/>}
                ListEmptyComponent={() => <Text className="text-center">Nothing saved yet — save an affirmation or resource from the other tabs.</Text>}
                ListFooterComponent={() =>  totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-2">Support Plan</Text>
                            <Text className="paragraph-medium text-gray-200">
                                {totalItems} saved {totalItems === 1 ? "item" : "items"} to lean on during hard days.
                            </Text>
                        </View>

                        <CustomButton title="Save Plan" onPress={() => {}} />
                        <CustomButton
                            title="Clear Pocket"
                            style="!bg-transparent border border-plum"
                            textStyle="!text-plum"
                            onPress={clearPocket}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}
export default Pocket

