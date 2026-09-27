import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BloomyButton from "@/components/BloomyButton";
import { cyclePhases } from "@/constants";
import { useProfileSetupStore } from "@/store/profileSetup.store";
import { CyclePhase } from "@/type";
import '../globals.css';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getCyclePhase(dayInCycle: number, cycleLength: number, periodLength: number): CyclePhase {
    if (dayInCycle <= periodLength) return "menstrual";
    if (dayInCycle <= Math.round(cycleLength * 0.45)) return "follicular";
    if (dayInCycle <= Math.round(cycleLength * 0.55)) return "ovulation";
    return "luteal";
}

export default function Index() {
    const { answers } = useProfileSetupStore();

    const { dayInCycle, cycleLength, phase } = useMemo(() => {
        const cycleLength = answers.cycleLengthDays ?? 28;
        const periodLength = answers.periodLengthDays ?? 5;

        if (!answers.lastPeriodStart) {
            return { dayInCycle: 1, cycleLength, phase: cyclePhases[0] };
        }

        const start = new Date(answers.lastPeriodStart);
        const daysSince = Math.max(0, Math.floor((Date.now() - start.getTime()) / MS_PER_DAY));
        const dayInCycle = (daysSince % cycleLength) + 1;
        const phaseId = getCyclePhase(dayInCycle, cycleLength, periodLength);
        const phase = cyclePhases.find((p) => p.id === phaseId) ?? cyclePhases[0];

        return { dayInCycle, cycleLength, phase };
    }, [answers]);

    const progressPct = Math.round((dayInCycle / cycleLength) * 100);

    return (
        <SafeAreaView className="flex-1 bg-blush-100">
            <ScrollView contentContainerClassName="pb-32 px-5" showsVerticalScrollIndicator={false}>
                <View className="flex-between flex-row w-full my-5">
                    <View className="flex-start">
                        <Text className="small-bold text-primary">HELLO{answers.name ? `, ${answers.name.toUpperCase()}` : ""}</Text>
                        <Text className="paragraph-bold text-dark-100 mt-0.5">Here&apos;s your cycle today</Text>
                    </View>

                    <BloomyButton />
                </View>

                {/* Phase ring */}
                <View className="flex-center w-full my-4">
                    <View
                        className="flex-center rounded-full border-8"
                        style={{ width: 180, height: 180, borderColor: phase.color }}
                    >
                        <Text className="h1-bold text-dark-100">Day {dayInCycle}</Text>
                        <Text className="body-medium text-gray-200">of {cycleLength}</Text>
                    </View>
                </View>

                {/* Daily check-in / insight banner */}
                <View className="insight-card px-6" style={{ backgroundColor: phase.color }}>
                    <View className="insight-card__info">
                        <Text className="h3-bold text-white">{phase.title}</Text>
                        <Text className="paragraph-medium text-white/90">{phase.blurb}</Text>
                        <Text className="small-bold text-white/80">{progressPct}% through this cycle</Text>
                    </View>
                </View>

                <Text className="h3-bold text-dark-100 mt-6 mb-2">Today&apos;s check-in</Text>
                <View className="bg-white rounded-2xl p-5 shadow-md shadow-black/10">
                    <Text className="paragraph-medium text-gray-200">
                        Log how you&apos;re feeling today from the Resources tab, or reach out to
                        Bloomy any time you need to talk it through.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

