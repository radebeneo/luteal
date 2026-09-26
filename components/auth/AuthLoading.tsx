import { ActivityIndicator, View } from "react-native";

const AuthLoading = () => (
    <View className="flex-1 items-center justify-center bg-blush-50">
        <ActivityIndicator size="large" color="#3F2E45" />
    </View>
);

export default AuthLoading;