import { CycleDay } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CycleStore {
    days: CycleDay[];
    logDay: (day: CycleDay) => void;
    getDay: (date: string) => CycleDay | undefined;
    clearLog: () => void;
}

export const useCycleStore = create<CycleStore>()(
    persist(
        (set, get) => ({
            days: [],

            logDay: (day) =>
                set({
                    days: [...get().days.filter((d) => d.date !== day.date), day],
                }),

            getDay: (date) => get().days.find((d) => d.date === date),

            clearLog: () => set({ days: [] }),
        }),
        {
            name: "luteal-shield.cycle",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
