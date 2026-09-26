import { Text, TouchableOpacity } from "react-native";

interface SkipLinkProps {
    onPress: () => void;
}

const SkipLink = ({ onPress }: SkipLinkProps) => {
    return (
        <TouchableOpacity onPress={onPress} hitSlop={10} className="self-end px-6 pt-2">
            <Text className="paragraph-medium text-gray-100">Skip</Text>
        </TouchableOpacity>
    );
};
export default SkipLink;
