import { PocketStore } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePocketStore = create<PocketStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                if (get().items.some((i) => i.id === item.id)) return;
                set({ items: [...get().items, { ...item, savedAt: Date.now() }] });
            },

            removeItem: (id) =>
                set({ items: get().items.filter((i) => i.id !== id) }),

            reorder: (fromIndex, toIndex) => {
                const items = [...get().items];
                const [moved] = items.splice(fromIndex, 1);
                items.splice(toIndex, 0, moved);
                set({ items });
            },

            clearPocket: () => set({ items: [] }),

            getTotalItems: () => get().items.length,
        }),
        {
            name: "luteal-shield.pocket",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
