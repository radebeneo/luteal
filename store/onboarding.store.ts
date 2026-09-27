import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Tracks whether the user has seen the marketing splash carousel (app/onboarding).
// Profile data (name, cycle details, etc.) lives in store/profileSetup.store.ts.
interface OnboardingStore {
    completed: boolean;
    complete: () => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
    persist(
        (set) => ({
            completed: false,

            complete: () => set({ completed: true }),

            reset: () => set({ completed: false }),
        }),
        {
            name: "luteal-shield.onboarding",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
