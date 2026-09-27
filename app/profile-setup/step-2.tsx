import ProfileSetupStep from "@/components/profile-setup/ProfileSetupStep";
import WheelPicker, { WHEEL_ITEM_HEIGHT } from "@/components/profile-setup/WheelPicker";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

const daysInMonth = (monthIndex: number, year: number) => new Date(year, monthIndex + 1, 0).getDate();

const parseBirthday = (value: string) => {
    const parsed = value ? new Date(value) : null;
    if (parsed && !Number.isNaN(parsed.getTime())) {
        return { month: parsed.getMonth(), day: parsed.getDate() - 1, year: CURRENT_YEAR - parsed.getFullYear() };
    }
    return { month: 3, day: 14, year: CURRENT_YEAR - 1992 };
};

const ProfileSetupStepTwo = () => {
    const { answers, setAnswer } = useProfileSetupStore();
    const initial = parseBirthday(answers.birthday);
    const [monthIndex, setMonthIndex] = useState(initial.month);
    const [dayIndex, setDayIndex] = useState(initial.day);
    const [yearIndex, setYearIndex] = useState(initial.year);

    const days = useMemo(() => {
        const total = daysInMonth(monthIndex, YEARS[yearIndex]);
        return Array.from({ length: total }, (_, i) => String(i + 1));
    }, [monthIndex, yearIndex]);
    const clampedDayIndex = Math.min(dayIndex, days.length - 1);

    const birthday = useMemo(() => {
        const year = YEARS[yearIndex];
        const month = String(monthIndex + 1).padStart(2, "0");
        const day = String(clampedDayIndex + 1).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }, [clampedDayIndex, monthIndex, yearIndex]);

    return (
        <ProfileSetupStep
            currentStep={2}
            totalSteps={5}
            title="Tell Us Your Birthday"
            centerTitle
            centerContent
            scrollEnabled={false}
            onBack={() => router.back()}
            onContinue={() => {
                setAnswer("birthday", birthday);
                router.push("/profile-setup/step-5");
            }}
        >
            <View className="bg-white rounded-2xl shadow-md shadow-black/5 relative">
                <View className="flex-row items-center justify-center px-2">
                    <WheelPicker data={MONTHS} selectedIndex={monthIndex} onChange={setMonthIndex} width={100} />
                    <WheelPicker data={days} selectedIndex={clampedDayIndex} onChange={setDayIndex} width={70} />
                    <WheelPicker
                        data={YEARS.map(String)}
                        selectedIndex={yearIndex}
                        onChange={setYearIndex}
                        width={90}
                    />
                </View>

                <View
                    pointerEvents="none"
                    className="absolute left-0 right-0 border-t border-b border-gray-200/40"
                    style={{ top: WHEEL_ITEM_HEIGHT * 2, height: WHEEL_ITEM_HEIGHT }}
                />
            </View>
        </ProfileSetupStep>
    );
};

export default ProfileSetupStepTwo;
