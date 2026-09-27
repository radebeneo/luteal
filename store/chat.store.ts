import { ChatMessage } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const BLOOMY_API_URL = process.env.EXPO_PUBLIC_BLOOMY_API_URL;

type BloomyHistoryMessage = {
    role: "user" | "assistant";
    text: string;
};

interface ChatStore {
    messages: ChatMessage[];
    isSending: boolean;
    error: string | null;
    sendMessage: (text: string) => Promise<void>;
    retryLastMessage: () => Promise<void>;
    clearChat: () => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => {
            const requestReply = async (text: string, history: BloomyHistoryMessage[]) => {
                set({ isSending: true, error: null });

                if (!BLOOMY_API_URL) {
                    set({
                        error: "Bloomy isn't connected yet. Please try again later.",
                        isSending: false,
                    });
                    return;
                }

                try {
                    const response = await fetch(BLOOMY_API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: text, history }),
                    });

                    if (!response.ok) throw new Error(`Request failed (${response.status})`);

                    const data: { reply?: unknown } = await response.json();
                    const reply = typeof data.reply === "string" && data.reply.trim()
                        ? data.reply.trim()
                        : "I'm here, but I didn't get a reply back.";

                    set({
                        messages: [
                            ...get().messages,
                            {
                                id: `${Date.now()}-bloomy`,
                                role: "bloomy",
                                text: reply,
                                createdAt: Date.now(),
                            },
                        ],
                        isSending: false,
                    });
                } catch {
                    set({
                        error: "Bloomy is unreachable right now. Please try again soon.",
                        isSending: false,
                    });
                }
            };

            const toHistory = (messages: ChatMessage[]): BloomyHistoryMessage[] =>
                messages.map(({ role, text }) => ({
                    role: role === "bloomy" ? "assistant" : "user",
                    text,
                }));

            return {
                messages: [],
                isSending: false,
                error: null,

                sendMessage: async (text) => {
                    const normalizedText = text.trim();
                    if (!normalizedText || get().isSending) return;

                    const previousMessages = get().messages;
                    const userMessage: ChatMessage = {
                        id: `${Date.now()}-user`,
                        role: "user",
                        text: normalizedText,
                        createdAt: Date.now(),
                    };
                    set({ messages: [...previousMessages, userMessage] });
                    await requestReply(normalizedText, toHistory(previousMessages));
                },

                retryLastMessage: async () => {
                    const messages = get().messages;
                    const lastMessage = messages[messages.length - 1];
                    if (get().isSending || lastMessage?.role !== "user") return;

                    await requestReply(lastMessage.text, toHistory(messages.slice(0, -1)));
                },

                clearChat: () => set({ messages: [], error: null }),
            };
        },
        {
            name: "luteal-shield.chat",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ messages: state.messages }),
        }
    )
);
