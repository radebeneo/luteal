import { ProfileSetupAnswers } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProfileSetupStore {
    completed: boolean;
    answers: ProfileSetupAnswers;
    setAnswer: <K extends keyof ProfileSetupAnswers>(
        key: K,
        value: ProfileSetupAnswers[K]
    ) => void;
    complete: () => void;
    reset: () => void;
}

const initialAnswers: ProfileSetupAnswers = {
    name: "",
    birthday: "",
    weightKg: null,
    heightCm: null,
    periodLengthDays: null,
    cycleLengthDays: null,
    lastPeriodStart: null,
};

export const useProfileSetupStore = create<ProfileSetupStore>()(
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
            name: "luteal-shield.profile-setup",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
