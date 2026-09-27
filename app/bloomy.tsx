import { useChatStore } from "@/store/chat.store";
import type { ChatMessage } from "@/type";
import cn from "clsx";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
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
    const { messages, isSending, error, sendMessage, retryLastMessage, clearChat } = useChatStore();
    const [draft, setDraft] = useState("");
    const listRef = useRef<FlatList<ChatMessage>>(null);

    useEffect(() => {
        listRef.current?.scrollToEnd({ animated: true });
    }, [messages.length, isSending]);

    const handleSend = () => {
        const text = draft.trim();
        if (!text || isSending) return;
        setDraft("");
        void sendMessage(text);
    };

    const handleClear = () => {
        Alert.alert("Clear this conversation?", "This will remove Bloomy's saved chat history.", [
            { text: "Cancel", style: "cancel" },
            { text: "Clear", style: "destructive", onPress: clearChat },
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <View className="custom-header px-5 pt-4 mb-0">
                    <View>
                        <Text className="h3-bold text-dark-100">Bloomy</Text>
                        <Text className="body-regular text-gray-200">A gentle space to talk</Text>
                    </View>
                    <View className="flex-row items-center gap-x-4">
                        {messages.length > 0 && (
                            <TouchableOpacity
                                onPress={handleClear}
                                disabled={isSending}
                                className={isSending ? "opacity-50" : undefined}
                                accessibilityRole="button"
                                accessibilityLabel="Clear conversation"
                            >
                                <Text className="body-medium text-primary">Clear</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close Bloomy">
                            <Text className="paragraph-semibold text-primary">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    ref={listRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerClassName="px-5 pb-5 gap-y-3"
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    ListEmptyComponent={() => (
                        <View className="flex-1 justify-center gap-y-4 py-8">
                            <Text className="text-center paragraph-medium text-dark-100">
                                Say hi to Bloomy. What would feel helpful right now?
                            </Text>
                            {[
                                "I'm having a hard day",
                                "Help me make a plan for today",
                                "I want to talk through what I'm feeling",
                            ].map((prompt) => (
                                <TouchableOpacity
                                    key={prompt}
                                    className="rounded-2xl border border-primary/20 bg-white px-4 py-3"
                                    onPress={() => void sendMessage(prompt)}
                                    accessibilityRole="button"
                                >
                                    <Text className="body-medium text-dark-100">{prompt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                    ListFooterComponent={
                        <View className="gap-y-2 pt-1">
                            {isSending && (
                                <View className="self-start flex-row items-center gap-x-2 rounded-2xl bg-white px-4 py-3">
                                    <ActivityIndicator size="small" color="#6B4E71" />
                                    <Text className="body-regular text-gray-200">Bloomy is thinking...</Text>
                                </View>
                            )}
                            {error && (
                                <View className="flex-row items-center justify-between gap-x-3">
                                    <Text className="flex-1 small-bold text-error">{error}</Text>
                                    <TouchableOpacity onPress={() => void retryLastMessage()} accessibilityRole="button">
                                        <Text className="body-medium text-primary">Try again</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    }
                />

                <View className="flex-row items-center gap-x-2 px-5 pb-5">
                    <TextInput
                        value={draft}
                        onChangeText={setDraft}
                        placeholder="Message Bloomy..."
                        editable={!isSending}
                        className="flex-1 rounded-full bg-white px-5 py-3 paragraph-medium text-dark-100"
                        onSubmitEditing={handleSend}
                        returnKeyType="send"
                    />
                    <TouchableOpacity
                        className={cn("bloomy-btn", (!draft.trim() || isSending) && "opacity-50")}
                        onPress={handleSend}
                        disabled={!draft.trim() || isSending}
                        accessibilityRole="button"
                        accessibilityLabel="Send message"
                    >
                        <Text className="text-white paragraph-bold">→</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default BloomyScreen;
