import { View } from "react-native";

interface PaginationProps {
    total: number;
    activeIndex: number;
}

const Pagination = ({ total, activeIndex }: PaginationProps) => {
    return (
        <View className="flex-row items-center justify-center gap-x-2">
            {Array.from({ length: total }).map((_, i) =>
                i === activeIndex ? (
                    <View key={i} className="h-2 w-6 rounded-full bg-plum" />
                ) : (
                    <View key={i} className="size-2 rounded-full bg-primary/30" />
                )
            )}
        </View>
    );
};
export default Pagination;
