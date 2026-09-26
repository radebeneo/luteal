import AuthLoading from "@/components/auth/AuthLoading";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuth } from "@clerk/expo";
import { Redirect, type Href } from "expo-router";

const AppEntry = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const completed = useOnboardingStore((state) => state.completed);

    if (!isLoaded) return <AuthLoading />;
    if (!isSignedIn) return <Redirect href={"/(auth)/welcome" as Href} />;

    return <Redirect href={completed ? "/(tabs)" : "/onboarding"} />;
};

export default AppEntry;