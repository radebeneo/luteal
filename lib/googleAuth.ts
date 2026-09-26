import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
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

    const signInWithGoogle = useCallback(async () => {
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
                // Missing requirements after SSO (e.g. legal acceptance) — no mockup yet, route to the form.
                router.push("/(auth)/sign-up-form");
            }
        } catch (err) {
            console.error("Google sign-in failed:", JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow]);

    return { signInWithGoogle };
};
