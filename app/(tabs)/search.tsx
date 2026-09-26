import BloomyButton from "@/components/BloomyButton";
import FilterComponent from "@/components/FilterComponent";
import ResourceCard from "@/components/ResourceCard";
import SearchBar from "@/components/SearchBar";
import dummyData from "@/lib/data";
import { Category, ResourceArticle } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const categories: Category[] = dummyData.categories.map((category) => ({
    ...category,
    $id: category.name,
}));
const resources: ResourceArticle[] = dummyData.resources.map((item, index) => ({
    ...item,
    $id: `resource-${index + 1}`,
}));

const Search = () => {

    const {category, query} = useLocalSearchParams<{query?: string, category?: string}> ()
    const data = resources.filter((item) =>
        (!category || item.category_name === category) &&
        (!query || item.name.toLowerCase().includes(query.toLowerCase()))
    );


    return (
        <SafeAreaView className="bg-white h-full">

            <FlatList
                data={data}
                renderItem={({ item, index }) => {

                    const isFirstRightColItem = index % 2 === 0

                    return (
                        <View className={cn('flex-1 max-w-[48%]', !isFirstRightColItem ? 'mt-10' : 'mt-0')}>
                            <ResourceCard item={item} />
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
                    </View>
                )}
                ListEmptyComponent={() => <Text className="text-center">No results found</Text>}

            />



        </SafeAreaView>
    )
}
export default Search

