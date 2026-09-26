import { getAuthErrorMessage } from "@/lib/authUtils";
import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// Preloads the browser on Android to reduce OAuth load time.
const useWarmUpBrowser = () => {
    useEffect(() => {
        if (Platform.OS !== "android") return;
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

// Shared Google OAuth flow for both the sign-up entry screen and the sign-up form.
// Requires the Google social connection to be enabled in the Clerk Dashboard.
export const useGoogleSSO = () => {
    useWarmUpBrowser();
    const { startSSOFlow } = useSSO();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const signInWithGoogle = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError("");
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_google",
                redirectUrl: AuthSession.makeRedirectUri({
                    scheme: "lutealshield",
                    path: "/continue",
                }),
            });

            if (createdSessionId && setActive) {
                await setActive({
                    session: createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Session tasks (e.g. org selection) aren't designed for yet — flagging as an open item.
                            return;
                        }
                        router.replace("/(tabs)");
                    },
                });
            } else {
                setError("Google sign-in didn't finish. Check that Google is enabled for this app, then try again.");
            }
        } catch (err) {
            setError(getAuthErrorMessage(err, "Google sign-in isn't available right now. Please try again."));
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, startSSOFlow]);

    return { signInWithGoogle, isLoading, error };
};
