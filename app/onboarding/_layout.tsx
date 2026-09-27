import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
const OnboardingLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const completed = useOnboardingStore((state) => state.completed);
    const profileSetupCompleted = useProfileSetupStore((state) => state.completed);

    if (completed) {
        if (!isLoaded) return <AuthLoading />;
        if (!isSignedIn) return <Redirect href="/(auth)/welcome" />;
        return <Redirect href={profileSetupCompleted ? "/(tabs)" : "/profile-setup"} />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};
export default OnboardingLayout;
