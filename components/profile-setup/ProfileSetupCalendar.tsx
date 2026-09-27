import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ProfileSetupCalendarProps = {
    selectedDate: string;
    onSelect: (date: string) => void;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });

const toLocalDate = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
};

const toDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const ProfileSetupCalendar = ({ selectedDate, onSelect }: ProfileSetupCalendarProps) => {
    const today = new Date();
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const date = selectedDate ? toLocalDate(selectedDate) : today;
        return new Date(date.getFullYear(), date.getMonth(), 1);
    });
    const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const dayCount = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
    const offset = monthStart.getDay();
    const dates = Array.from({ length: Math.ceil((offset + dayCount) / 7) * 7 }, (_, index) => {
        const day = index - offset + 1;
        return day > 0 && day <= dayCount ? day : null;
    });
    const isCurrentMonth = visibleMonth.getFullYear() === today.getFullYear() && visibleMonth.getMonth() === today.getMonth();

    const changeMonth = (amount: number) => {
        setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1));
    };

    return (
        <View className="bg-white rounded-2xl p-4 shadow-md shadow-black/5">
            <View className="flex-row items-center justify-between mb-4">
                <Pressable
                    onPress={() => changeMonth(-1)}
                    className="size-10 items-center justify-center rounded-full bg-blush-50"
                    accessibilityRole="button"
                    accessibilityLabel="Previous month"
                >
                    <Feather name="chevron-left" size={20} color="#3F2E45" />
                </Pressable>
                <Text className="paragraph-bold text-dark-100">{MONTH_FORMATTER.format(visibleMonth)}</Text>
                <Pressable
                    onPress={() => changeMonth(1)}
                    disabled={isCurrentMonth}
                    className={`size-10 items-center justify-center rounded-full ${isCurrentMonth ? "opacity-30" : "bg-blush-50"}`}
                    accessibilityRole="button"
                    accessibilityLabel="Next month"
                    accessibilityState={{ disabled: isCurrentMonth }}
                >
                    <Feather name="chevron-right" size={20} color="#3F2E45" />
                </Pressable>
            </View>

            <View className="flex-row mb-2">
                {WEEKDAYS.map((weekday, index) => (
                    <View key={`${weekday}-${index}`} className="flex-1 h-8 items-center justify-center">
                        <Text className="small-bold text-gray-200">{weekday}</Text>
                    </View>
                ))}
            </View>

            {Array.from({ length: dates.length / 7 }, (_, week) => (
                <View key={week} className="flex-row">
                    {dates.slice(week * 7, week * 7 + 7).map((day, column) => {
                        if (day === null) return <View key={`empty-${column}`} className="flex-1 h-11" />;

                        const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
                        const dateKey = toDateKey(date);
                        const isSelected = selectedDate === dateKey;
                        const isFuture = date > new Date(today.getFullYear(), today.getMonth(), today.getDate());

                        return (
                            <Pressable
                                key={dateKey}
                                onPress={() => onSelect(dateKey)}
                                disabled={isFuture}
                                className={`flex-1 h-11 items-center justify-center ${isSelected ? "bg-plum rounded-full" : ""} ${isFuture ? "opacity-30" : ""}`}
                                accessibilityRole="button"
                                accessibilityLabel={date.toLocaleDateString("en", { dateStyle: "long" })}
                                accessibilityState={{ selected: isSelected, disabled: isFuture }}
                            >
                                <Text className={`paragraph-medium ${isSelected ? "text-white" : "text-dark-100"}`}>{day}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

export default ProfileSetupCalendar;