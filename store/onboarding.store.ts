import { OnboardingAnswers } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OnboardingStore {
    completed: boolean;
    answers: OnboardingAnswers;
    setAnswer: <K extends keyof OnboardingAnswers>(
        key: K,
        value: OnboardingAnswers[K]
    ) => void;
    complete: () => void;
    reset: () => void;
}

const initialAnswers: OnboardingAnswers = {
    name: "",
    birthday: "",
    weightKg: null,
    heightCm: null,
    periodLengthDays: null,
    cycleLengthDays: null,
    lastPeriodStart: null,
};

export const useOnboardingStore = create<OnboardingStore>()(
    persist(
        (set) => ({
            completed: false,
            answers: initialAnswers,

            setAnswer: (key, value) =>
                set((state) => ({
                    answers: { ...state.answers, [key]: value },
                })),

            complete: () => set({ completed: true }),

            reset: () => set({ completed: false, answers: initialAnswers }),
        }),
        {
            name: "luteal-shield.onboarding",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
