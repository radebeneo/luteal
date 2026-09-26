import { CyclePhase } from "@/type";

import arrowDown from "@/assets/icons/arrow-down.png";
import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import user from "@/assets/icons/user.png";
import arrowBack from "../assets/icons/arrow-back.png";

import avatar from "@/assets/images/avatar.png";
import emptyState from "@/assets/images/empty-state.png";
import loginGraphic from "@/assets/images/login-graphic.png";
import logo from "@/assets/images/logo.png";
import success from "@/assets/images/success.png";

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
    avatar,
    emptyState,
    loginGraphic,
    logo,
    success,
    arrowBack,
    arrowDown,
    arrowRight,
    bag,
    check,
    clock,
    envelope,
    home,
    location,
    logout,
    minus,
    pencil,
    person,
    phone,
    plus,
    search,
    star,
    trash,
    user,
};