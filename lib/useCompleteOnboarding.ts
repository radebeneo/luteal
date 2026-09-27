import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";

// Marks the marketing splash carousel as seen; root index.tsx decides the next screen.
export const useCompleteOnboarding = () => {
    const complete = useOnboardingStore((state) => state.complete);

    return () => {
        complete();
        router.replace("/");
    };
};
