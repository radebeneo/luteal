import { create } from "zustand";

// Tracks whether the user has seen the marketing splash carousel (app/onboarding)
// for the current app session. Intentionally not persisted so the carousel is
// shown again before the auth screens on every fresh launch (and after sign-out).
// Profile data (name, cycle details, etc.) lives in store/profileSetup.store.ts.
interface OnboardingStore {
    completed: boolean;
    complete: () => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()((set) => ({
    completed: false,

    complete: () => set({ completed: true }),

    reset: () => set({ completed: false }),
}));
