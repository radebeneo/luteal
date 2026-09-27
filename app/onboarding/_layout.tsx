import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
const OnboardingLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const completed = useOnboardingStore((state) => state.completed);

    if (completed) {
        if (!isLoaded) return <AuthLoading />;
        return <Redirect href={isSignedIn ? "/(tabs)" : "/(auth)/welcome"} />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};
export default OnboardingLayout;
