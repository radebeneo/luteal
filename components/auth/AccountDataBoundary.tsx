import AuthLoading from "@/components/auth/AuthLoading";
import { useChatStore } from "@/store/chat.store";
import { useCycleStore } from "@/store/cycle.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import { usePocketStore } from "@/store/pocket.store";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { useSettingsStore } from "@/store/settings.store";
import { useAuth } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const accountOwnerKey = "luteal-shield.account-owner";
const persistedKeys = [
    "luteal-shield.profile-setup",
    "luteal-shield.cycle",
    "luteal-shield.pocket",
    "luteal-shield.settings",
    "luteal-shield.chat",
];

const getAccountStorageKey = (userId: string, key: string) => `luteal-shield.account.${userId}.${key}`;

interface BoundaryState {
    userId: string | null;
    error: boolean;
}

const AccountDataBoundary = ({ children }: { children: ReactNode }) => {
    const { isLoaded, userId } = useAuth();
    const [state, setState] = useState<BoundaryState | null>(null);

    useEffect(() => {
        if (!isLoaded) return;
        let cancelled = false;

        const prepareAccountData = async () => {
            try {
                if (!userId) {
                    // Signed out: re-show the onboarding carousel before the next auth attempt.
                    useOnboardingStore.getState().reset();
                    if (!cancelled) setState({ userId: null, error: false });
                    return;
                }

                const previousUserId = await AsyncStorage.getItem(accountOwnerKey);
                if (previousUserId && previousUserId !== userId) {
                    const existingData = await AsyncStorage.multiGet(persistedKeys);
                    const previousAccountData = existingData.flatMap(([key, value]) =>
                        value === null ? [] : [[getAccountStorageKey(previousUserId, key), value] as [string, string]],
                    );
                    if (previousAccountData.length) await AsyncStorage.multiSet(previousAccountData);

                    await AsyncStorage.multiRemove(persistedKeys);
                    const accountKeys = persistedKeys.map((key) => getAccountStorageKey(userId, key));
                    const accountData = await AsyncStorage.multiGet(accountKeys);
                    const restoredData = accountData.flatMap(([, value], index) =>
                        value === null ? [] : [[persistedKeys[index], value] as [string, string]],
                    );
                    if (restoredData.length) await AsyncStorage.multiSet(restoredData);

                    await Promise.all([
                        useProfileSetupStore.persist.rehydrate(),
                        useCycleStore.persist.rehydrate(),
                        usePocketStore.persist.rehydrate(),
                        useSettingsStore.persist.rehydrate(),
                        useChatStore.persist.rehydrate(),
                    ]);

                    const accountDataKeys = new Set(accountData.flatMap(([key, value]) => value === null ? [] : [key]));
                    if (!accountDataKeys.has(accountKeys[0])) useProfileSetupStore.getState().reset();
                    if (!accountDataKeys.has(accountKeys[1])) useCycleStore.getState().clearLog();
                    if (!accountDataKeys.has(accountKeys[2])) usePocketStore.getState().clearPocket();
                    if (!accountDataKeys.has(accountKeys[3])) useSettingsStore.getState().reset();
                    if (!accountDataKeys.has(accountKeys[4])) useChatStore.getState().clearChat();
                }

                await AsyncStorage.setItem(accountOwnerKey, userId);
                if (!cancelled) setState({ userId, error: false });
            } catch {
                if (!cancelled) setState({ userId, error: true });
            }
        };

        void prepareAccountData();
        return () => { cancelled = true; };
    }, [isLoaded, userId]);

    if (!isLoaded || !state || state.userId !== userId) return <AuthLoading />;
    if (state.error) {
        return (
            <View className="flex-1 items-center justify-center bg-blush-50 px-8">
                <Text className="h3-bold mb-2 text-center text-dark-100">Your saved data couldn’t be loaded</Text>
                <Text className="body-regular text-center text-gray-200">Close and reopen the app to try again. Your account data has not been cleared.</Text>
            </View>
        );
    }

    return children;
};

export default AccountDataBoundary;