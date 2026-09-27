import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

const ProfileSetupLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const marketingCompleted = useOnboardingStore((state) => state.completed);
    const completed = useProfileSetupStore((state) => state.completed);

    if (!marketingCompleted) return <Redirect href="/onboarding" />;
    if (!isLoaded) return <AuthLoading />;
    if (!isSignedIn) return <Redirect href="/(auth)/welcome" />;
    if (completed) return <Redirect href="/(tabs)" />;

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default ProfileSetupLayout;
