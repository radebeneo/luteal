import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthPageProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    footer?: ReactNode;
    showBack?: boolean;
    onBack?: () => void;
}

export const AuthPage = ({
    title,
    subtitle,
    children,
    footer,
    showBack = true,
    onBack,
}: AuthPageProps) => (
    <SafeAreaView className="flex-1 bg-blush-50">
        {showBack ? (
            <View className="h-14 justify-center px-5">
                <TouchableOpacity
                    onPress={onBack ?? (() => router.back())}
                    className="size-11 items-center justify-center rounded-2xl bg-white"
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                    hitSlop={8}
                >
                    <Feather name="chevron-left" size={23} color="#3F2E45" />
                </TouchableOpacity>
            </View>
        ) : <View className="h-14" />}

        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, paddingVertical: 20 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            >
                <View className="w-full rounded-3xl bg-white p-6 shadow-md shadow-black/10">
                    <View className="mb-6 items-center">
                        <Image
                            source={require("@/assets/images/screen-three-deco.svg")}
                            style={{ width: 96, height: 111 }}
                            contentFit="contain"
                            accessibilityLabel="The droplet mascot holding up a menstrual calendar"
                        />
                        <Text className="font-quicksand-bold text-center text-[28px] leading-9 text-dark-100">{title}</Text>
                        <Text className="body-regular mb-6 mt-1 text-center text-gray-200">{subtitle}</Text>
                    </View>
                    {children}
                </View>
                {footer ? <View className="mt-5 items-center">{footer}</View> : null}
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
);

export const AuthError = ({ message }: { message: string }) => (
    <View className="mb-4 rounded-xl bg-error/10 px-3 py-2.5" accessibilityRole="alert">
        <Text className="body-regular text-error">{message}</Text>
    </View>
);
