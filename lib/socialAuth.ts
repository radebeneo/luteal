import { getAuthErrorMessage } from "@/lib/authUtils";
import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import type { Href } from "expo-router";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export type SocialProvider = "google" | "apple";

const useWarmUpBrowser = () => {
    useEffect(() => {
        if (Platform.OS !== "android") return;
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

export const useSocialSSO = (destination: Href) => {
    useWarmUpBrowser();
    const { startSSOFlow } = useSSO();
    const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);
    const [error, setError] = useState("");

    const signInWithSocial = async (provider: SocialProvider) => {
        if (loadingProvider) return;
        setLoadingProvider(provider);
        setError("");

        const redirectUrl = AuthSession.makeRedirectUri(
            Constants.appOwnership === "expo"
                ? { path: "oauth-native-callback" }
                : { scheme: "lutealshield", path: "oauth-native-callback" },
        );

        try {
            const { createdSessionId, setActive, authSessionResult } = await startSSOFlow({
                strategy: provider === "google" ? "oauth_google" : "oauth_apple",
                redirectUrl,
            });

            if (authSessionResult?.type === "cancel" || authSessionResult?.type === "dismiss") {
                setError(`${provider === "google" ? "Google" : "Apple"} sign-in was canceled.`);
                return;
            }

            if (!createdSessionId || !setActive) {
                setError(`${provider === "google" ? "Google" : "Apple"} sign-in didn't finish. Check that this provider is enabled, then try again.`);
                return;
            }

            await setActive({
                session: createdSessionId,
                navigate: async ({ session }) => {
                    if (session?.currentTask) return;
                    router.replace(destination);
                },
            });
        } catch (err) {
            setError(getAuthErrorMessage(err, `${provider === "google" ? "Google" : "Apple"} sign-in isn't available right now. Please try again.`));
        } finally {
            setLoadingProvider(null);
        }
    };

    return { signInWithSocial, loadingProvider, error };
};