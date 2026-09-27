import AccountDataBoundary from "@/components/auth/AccountDataBoundary";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import * as Sentry from '@sentry/react-native';
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import './globals.css';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file");
}

// Session Replay / Feedback rely on native modules unavailable in Expo Go
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

Sentry.init({
  dsn: 'https://7164bfca466ccf658e642a4909daa88f@o4510712903237632.ingest.de.sentry.io/4510712961171536',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: isExpoGo ? [] : [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
    "Fredoka-Light": require('../assets/fonts/Fredoka-Light.ttf'),
    "Fredoka-Regular": require('../assets/fonts/Fredoka-Regular.ttf'),
    "Fredoka-Medium": require('../assets/fonts/Fredoka-Medium.ttf'),
    "Fredoka-SemiBold": require('../assets/fonts/Fredoka-SemiBold.ttf'),
    "Fredoka-Bold": require('../assets/fonts/Fredoka-Bold.ttf'),
  })

  const [hasHydrated, setHasHydrated] = useState(useProfileSetupStore.persist.hasHydrated());

  useEffect(() => {
    if (useProfileSetupStore.persist.hasHydrated()) {
      setHasHydrated(true);
      return;
    }
    const unsubProfileSetup = useProfileSetupStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    return () => {
      unsubProfileSetup();
    };
  }, []);

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if(!fontsLoaded || !hasHydrated) return null

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AccountDataBoundary>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="profile-setup" />
          <Stack.Screen name="bloomy" options={{ presentation: "modal" }} />
        </Stack>
      </AccountDataBoundary>
    </ClerkProvider>
  );

});