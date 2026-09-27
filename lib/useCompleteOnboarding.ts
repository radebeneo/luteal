import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";

export const useCompleteOnboarding = () => {
    const complete = useOnboardingStore((state) => state.complete);
    const { isSignedIn } = useAuth();

    return () => {
        complete();
        router.replace(isSignedIn ? "/(tabs)" : "/(auth)/welcome");
    };
};
