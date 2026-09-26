import { Feather } from "@expo/vector-icons";
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
            >
                <View className="w-full rounded-3xl bg-white p-6 shadow-md shadow-black/10">
                    <View className="mb-5 size-11 items-center justify-center rounded-2xl bg-blush-100">
                        <Feather name="heart" size={21} color="#3F2E45" />
                    </View>
                    <Text className="font-quicksand-bold text-[28px] leading-9 text-dark-100">{title}</Text>
                    <Text className="body-regular mb-6 mt-1 text-gray-200">{subtitle}</Text>
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

export const AuthDivider = () => (
    <View className="my-5 flex-row items-center">
        <View className="h-px flex-1 bg-gray-200/40" />
        <Text className="body-regular px-3 text-gray-200">or continue with</Text>
        <View className="h-px flex-1 bg-gray-200/40" />
    </View>
);