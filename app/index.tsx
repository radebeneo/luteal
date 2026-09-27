import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { useAuth } from "@clerk/expo";
import { Redirect, type Href } from "expo-router";

const AppEntry = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const completed = useOnboardingStore((state) => state.completed);
    const profileSetupCompleted = useProfileSetupStore((state) => state.completed);

    if (!completed) return <Redirect href="/onboarding" />;
    if (!isLoaded) return <AuthLoading />;
    if (!isSignedIn) return <Redirect href={"/(auth)/welcome" as Href} />;
    if (!profileSetupCompleted) return <Redirect href={"/profile-setup" as Href} />;

    return <Redirect href="/(tabs)" />;
};

export default AppEntry;