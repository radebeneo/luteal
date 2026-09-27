import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const completed = useOnboardingStore((state) => state.completed);

    if (!completed) return <Redirect href="/onboarding" />;
    if (!isLoaded) return <AuthLoading />;
    if (isSignedIn) return <Redirect href="/(tabs)" />;

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;