import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { useOnboardingStore } from "@/store/onboarding.store";
import { usePocketStore } from "@/store/pocket.store";
import { useSettingsStore } from "@/store/settings.store";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileRow = ({ label, value }: { label: string; value: string }) => (
    <View className="profile-field justify-between">
        <Text className="label !w-auto !p-0">{label}</Text>
        <Text className="paragraph-medium text-dark-100">{value}</Text>
    </View>
);

const Profile = () => {
    const { answers, reset: resetOnboarding } = useOnboardingStore();
    const { clearPocket } = usePocketStore();
    const { notificationsEnabled, setNotificationsEnabled, tetherContact } = useSettingsStore();
    const { signOut } = useAuth();

    const handleReset = () => {
        clearPocket();
        resetOnboarding();
        router.replace("/onboarding/name");
    };

    const handleLogout = async () => {
        await signOut();
        router.replace("/(auth)/welcome");
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="px-5 pt-5 pb-32">
                <CustomHeader title="Settings" />

                <Text className="h3-bold text-dark-100 mb-3">Your details</Text>
                <View className="mb-6">
                    <ProfileRow label="Name" value={answers.name || "—"} />
                    <ProfileRow label="Birthday" value={answers.birthday || "—"} />
                    <ProfileRow label="Weight" value={answers.weightKg ? `${answers.weightKg} kg` : "—"} />
                    <ProfileRow label="Height" value={answers.heightCm ? `${answers.heightCm} cm` : "—"} />
                    <ProfileRow label="Period length" value={answers.periodLengthDays ? `${answers.periodLengthDays} days` : "—"} />
                    <ProfileRow label="Cycle length" value={answers.cycleLengthDays ? `${answers.cycleLengthDays} days` : "—"} />
                    <ProfileRow label="Last period start" value={answers.lastPeriodStart || "—"} />
                </View>

                <Text className="h3-bold text-dark-100 mb-3">Tether contact</Text>
                <View className="mb-6">
                    <ProfileRow label="Name" value={tetherContact?.name || "Not set"} />
                    <ProfileRow label="Phone" value={tetherContact?.phone || "Not set"} />
                </View>

                <View className="flex-between flex-row mb-8">
                    <Text className="paragraph-medium text-dark-100">Notifications</Text>
                    <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ true: "#B98CDD" }} />
                </View>

                <CustomButton
                    title="Reset all data"
                    style="!bg-transparent border border-error"
                    textStyle="!text-error"
                    onPress={handleReset}
                />
                <CustomButton
                    title="Log out"
                    style="!bg-transparent border border-gray-200 mt-3"
                    textStyle="!text-dark-100"
                    onPress={handleLogout}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
