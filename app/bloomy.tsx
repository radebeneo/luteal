import { useChatStore } from "@/store/chat.store";
import cn from "clsx";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BloomyScreen = () => {
    const { messages, isSending, error, sendMessage } = useChatStore();
    const [draft, setDraft] = useState("");

    const handleSend = () => {
        const text = draft.trim();
        if (!text) return;
        setDraft("");
        sendMessage(text);
    };

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <View className="custom-header px-5 pt-4 mb-0">
                    <Text className="h3-bold text-dark-100">Bloomy</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="paragraph-semibold text-primary">Close</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerClassName="px-5 pb-5 gap-y-3"
                    ListEmptyComponent={() => (
                        <Text className="text-center body-regular text-gray-200 mt-10">
                            Say hi to Bloomy — your AI companion for the hard days.
                        </Text>
                    )}
                    renderItem={({ item }) => (
                        <View
                            className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-3",
                                item.role === "user"
                                    ? "self-end bg-plum"
                                    : "self-start bg-white shadow-sm shadow-black/10"
                            )}
                        >
                            <Text className={item.role === "user" ? "text-white" : "text-dark-100"}>
                                {item.text}
                            </Text>
                        </View>
                    )}
                />

                {error && (
                    <Text className="text-center small-bold text-error px-5 mb-2">{error}</Text>
                )}

                <View className="flex-row items-center gap-x-2 px-5 pb-5">
                    <TextInput
                        value={draft}
                        onChangeText={setDraft}
                        placeholder="Message Bloomy..."
                        className="flex-1 bg-white rounded-full px-5 py-3 paragraph-medium text-dark-100"
                        onSubmitEditing={handleSend}
                        returnKeyType="send"
                    />
                    <TouchableOpacity
                        className="bloomy-btn"
                        onPress={handleSend}
                        disabled={isSending}
                    >
                        <Text className="text-white paragraph-bold">→</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default BloomyScreen;
