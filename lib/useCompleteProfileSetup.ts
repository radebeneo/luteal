import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";

export const useCompleteProfileSetup = () => {
    const complete = useProfileSetupStore((state) => state.complete);

    return () => {
        complete();
        router.replace("/(tabs)");
    };
};
