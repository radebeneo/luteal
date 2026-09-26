import { useOnboardingStore } from "@/store/onboarding.store";
import { router } from "expo-router";

export const useCompleteOnboarding = () => {
    const complete = useOnboardingStore((state) => state.complete);

    return () => {
        complete();
        router.replace("/(tabs)");
    };
};
