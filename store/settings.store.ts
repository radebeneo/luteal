import { UserSettings } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsStore extends UserSettings {
    setNotificationsEnabled: (enabled: boolean) => void;
    setTetherContact: (contact: UserSettings["tetherContact"]) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            notificationsEnabled: true,
            tetherContact: null,

            setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
            setTetherContact: (contact) => set({ tetherContact: contact }),
        }),
        {
            name: "luteal-shield.settings",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
