import BloomyButton from "@/components/BloomyButton";
import FilterComponent from "@/components/FilterComponent";
import ResourceCard from "@/components/ResourceCard";
import SearchBar from "@/components/SearchBar";
import dummyData from "@/lib/data";
import { Category, ResourceArticle } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const categories: Category[] = dummyData.categories.map((category) => ({
    ...category,
    $id: category.name,
}));
const resources: ResourceArticle[] = dummyData.resources.map((item, index) => ({
    ...item,
    $id: `resource-${index + 1}`,
}));

const openSupportLink = (url: string) => {
    Linking.openURL(url);
};

const CrisisSupport = () => (
    <View className="rounded-3xl bg-plum px-5 py-6">
        <Text className="small-bold uppercase text-white/75">Crisis support</Text>
        <Text className="h2-bold mt-1 text-white">Need help right now?</Text>
        <Text className="paragraph-medium mt-2 text-white/85">
            You deserve immediate support. Choose the option that feels safest.
        </Text>

        <View className="mt-5 gap-3">
            <Pressable
                accessibilityLabel="Call emergency services on 112"
                accessibilityRole="button"
                className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-4"
                onPress={() => openSupportLink("tel:112")}
            >
                <View className="flex-1 pr-3">
                    <Text className="paragraph-bold text-dark-100">Immediate danger</Text>
                    <Text className="small-medium mt-1 text-gray-200">Emergency services · 112</Text>
                </View>
                <Text className="paragraph-bold text-plum">Call 112</Text>
            </Pressable>

            <Pressable
                accessibilityLabel="Call SADAG Suicide Crisis Line on 0800 567 567"
                accessibilityRole="button"
                className="flex-row items-center justify-between rounded-2xl border border-white/30 px-4 py-4"
                onPress={() => openSupportLink("tel:0800567567")}
            >
                <View className="flex-1 pr-3">
                    <Text className="paragraph-bold text-white">SADAG Suicide Crisis Line</Text>
                    <Text className="small-medium mt-1 text-white/75">South Africa · 0800 567 567</Text>
                </View>
                <Text className="paragraph-bold text-white">Call SADAG</Text>
            </Pressable>

            <Pressable
                accessibilityLabel="Open IAPMD PMDD support"
                accessibilityRole="button"
                className="flex-row items-center justify-between rounded-2xl border border-white/30 px-4 py-4"
                onPress={() => openSupportLink("https://iapmd.org")}
            >
                <View className="flex-1 pr-3">
                    <Text className="paragraph-bold text-white">IAPMD PMDD support</Text>
                    <Text className="small-medium mt-1 text-white/75">Peer support and crisis resources</Text>
                </View>
                <Text className="paragraph-bold text-white">Visit IAPMD</Text>
            </Pressable>
        </View>
    </View>
);

const Search = () => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const {category, query} = useLocalSearchParams<{query?: string, category?: string}> ()
    const data = resources.filter((item) =>
        (!category || item.category_name === category) &&
        (!query || item.name.toLowerCase().includes(query.toLowerCase()))
    );

    useEffect(() => {
        if (!toastMessage) return;

        const timeout = setTimeout(() => setToastMessage(null), 2200);
        return () => clearTimeout(timeout);
    }, [toastMessage]);


    return (
        <SafeAreaView className="bg-white flex-1">

            <FlatList
                data={data}
                renderItem={({ item, index }) => {

                    const isFirstRightColItem = index % 2 === 0

                    return (
                        <View className={cn('flex-1 max-w-[48%]', !isFirstRightColItem ? 'mt-10' : 'mt-0')}>
                            <ResourceCard
                                item={item}
                                onSaved={(wasAlreadySaved) =>
                                    setToastMessage(wasAlreadySaved ? "Already in your Pocket" : "Saved to your Pocket")
                                }
                            />
                        </View>
                    )
                }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold uppercase text-primary">Resources</Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-semibold text-dark-100">Find support for how you feel</Text>
                                </View>
                            </View>
                            <BloomyButton/>
                        </View>
                        <SearchBar/>
                        <FilterComponent categories={categories}/>
                        <CrisisSupport />
                    </View>
                )}
                ListEmptyComponent={() => <Text className="text-center">No results found</Text>}

            />

            {toastMessage && (
                <View
                    className="absolute left-5 right-5 rounded-xl bg-dark-100 px-5 py-3"
                    style={{ bottom: 132, zIndex: 10, elevation: 10 }}
                    pointerEvents="none"
                    accessibilityRole="alert"
                    accessibilityLiveRegion="polite"
                >
                    <Text className="paragraph-semibold text-center text-white">{toastMessage}</Text>
                </View>
            )}

        </SafeAreaView>
    )
}
export default Search

