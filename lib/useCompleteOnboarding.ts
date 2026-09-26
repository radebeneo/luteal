import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";

// Routes returning signed-in users straight to the app; new users go through sign-up first.
export const useCompleteOnboarding = () => {
    const complete = useOnboardingStore((state) => state.complete);
    const { isSignedIn } = useAuth();

    return () => {
        complete();
        router.replace(isSignedIn ? "/(tabs)" : "/(auth)/sign-up");
    };
};
