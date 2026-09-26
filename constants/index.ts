import { CyclePhase } from "@/type";



export const CATEGORIES = [
    { id: "1", name: "All" },
    { id: "2", name: "Mood" },
    { id: "3", name: "Physical" },
    { id: "4", name: "Sleep" },
    { id: "5", name: "Coping" },
];

// Cycle phase copy + accent colors for the dashboard's insight banners
export const cyclePhases: {
    id: CyclePhase;
    title: string;
    blurb: string;
    color: string;
}[] = [
    {
        id: "menstrual",
        title: "Menstrual Phase",
        blurb: "Rest is productive. Be gentle with yourself today.",
        color: "#B98CDD",
    },
    {
        id: "follicular",
        title: "Follicular Phase",
        blurb: "Energy is returning — a good window to plan ahead.",
        color: "#E7A9C4",
    },
    {
        id: "ovulation",
        title: "Ovulation Phase",
        blurb: "You may feel your most social and energetic self.",
        color: "#D98FC0",
    },
    {
        id: "luteal",
        title: "Luteal Phase",
        blurb: "PMDD symptoms can peak now — lean on your support plan.",
        color: "#3F2E45",
    },
];

export const onboardingSteps = [
    "name",
    "birthday",
    "weight",
    "height",
    "period-length",
    "cycle-length",
    "last-period",
] as const;

export const images = {
    home: require("@/assets/icons/home.png"),
    search: require("@/assets/icons/search.png"),
    bag: require("@/assets/icons/bag.png"),
    person: require("@/assets/icons/person.png"),
    check: require("@/assets/icons/check.png"),
    star: require("@/assets/icons/star.png"),
    arrowBack: require("@/assets/icons/arrow-back.png"),
    trash: require("@/assets/icons/trash.png"),
};