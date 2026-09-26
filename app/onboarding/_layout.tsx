import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
const OnboardingLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const completed = useOnboardingStore((state) => state.completed);

    if (!isLoaded) return <AuthLoading />;
    if (!isSignedIn) return <Redirect href={"/(auth)/welcome" as import("expo-router").Href} />;
    if (completed) return <Redirect href="/(tabs)" />;

    return <Stack screenOptions={{ headerShown: false }} />;
};
export default OnboardingLayout;
