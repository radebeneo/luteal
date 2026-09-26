import { ChatMessage } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const BLOOMY_API_URL = process.env.EXPO_PUBLIC_BLOOMY_API_URL;

interface ChatStore {
    messages: ChatMessage[];
    isSending: boolean;
    error: string | null;
    sendMessage: (text: string) => Promise<void>;
    clearChat: () => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            messages: [],
            isSending: false,
            error: null,

            sendMessage: async (text) => {
                const userMessage: ChatMessage = {
                    id: `${Date.now()}-user`,
                    role: "user",
                    text,
                    createdAt: Date.now(),
                };
                set({ messages: [...get().messages, userMessage], isSending: true, error: null });

                if (!BLOOMY_API_URL) {
                    set({
                        messages: [
                            ...get().messages,
                            {
                                id: `${Date.now()}-bloomy`,
                                role: "bloomy",
                                text: "Bloomy isn't connected yet — ask your app admin to set EXPO_PUBLIC_BLOOMY_API_URL.",
                                createdAt: Date.now(),
                            },
                        ],
                        isSending: false,
                    });
                    return;
                }

                try {
                    const response = await fetch(BLOOMY_API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: text }),
                    });

                    if (!response.ok) throw new Error(`Request failed (${response.status})`);

                    const data = await response.json();
                    set({
                        messages: [
                            ...get().messages,
                            {
                                id: `${Date.now()}-bloomy`,
                                role: "bloomy",
                                text: data.reply ?? "I'm here, but I didn't get a reply back.",
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
            },

            clearChat: () => set({ messages: [], error: null }),
        }),
        {
            name: "luteal-shield.chat",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ messages: state.messages }),
        }
    )
);
