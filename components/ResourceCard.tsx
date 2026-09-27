import { usePocketStore } from "@/store/pocket.store";
import { ResourceArticle } from "@/type";
import { Platform, Text, TouchableOpacity } from "react-native";

const ResourceCard = ({
    item: { $id, name, description, tags },
    onSaved,
}: {
    item: ResourceArticle;
    onSaved?: (wasAlreadySaved: boolean) => void;
}) => {
    const addItem = usePocketStore((state) => state.addItem);
    const isSaved = usePocketStore((state) => state.items.some((savedItem) => savedItem.id === $id));

    const saveToPocket = () => {
        addItem({ id: $id, title: name, body: description, tags });
        onSaved?.(isSaved);
    };

    return (
        <TouchableOpacity
            className="resource-card"
            style={Platform.OS === "android" ? { elevation: 10, shadowColor: "#878787" } : {}}
        >
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={2}>
                {name}
            </Text>
            <Text className="body-regular text-gray-200 mb-4 text-center" numberOfLines={2}>
                {description}
            </Text>
            <TouchableOpacity
                onPress={saveToPocket}
            >
                <Text className="paragraph-bold text-primary">Save to Pocket +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};
export default ResourceCard;
