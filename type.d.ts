export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export interface ResourceArticle {
    $id: string;
    name: string;
    description: string;
    category_name: string;
    tags: string[];
}

export interface SymptomEntry {
    $id: string;
    name: string;
    description: string;
    category_name: string;
    tags: string[];
}

export interface Category {
    $id: string;
    name: string;
    description: string;
}

export interface PlanItemType {
    id: string; // affirmation/plan item id
    title: string;
    body: string;
    tags?: string[];
    savedAt: number;
}

export interface PocketStore {
    items: PlanItemType[];
    addItem: (item: Omit<PlanItemType, "savedAt">) => void;
    removeItem: (id: string) => void;
    reorder: (fromIndex: number, toIndex: number) => void;
    clearPocket: () => void;
    getTotalItems: () => number;
}

export interface CycleDay {
    date: string; // ISO date, yyyy-mm-dd
    symptoms: string[];
    mood?: string;
    notes?: string;
}

export interface OnboardingAnswers {
    name: string;
    birthday: string; // ISO date
    weightKg: number | null;
    heightCm: number | null;
    periodLengthDays: number | null;
    cycleLengthDays: number | null;
    lastPeriodStart: string | null; // ISO date
}

export interface TetherContact {
    name: string;
    phone: string;
    relationship?: string;
}

export interface ChatMessage {
    id: string;
    role: "user" | "bloomy";
    text: string;
    createdAt: number;
}

export interface UserSettings {
    notificationsEnabled: boolean;
    tetherContact: TetherContact | null;
}

interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

interface InsightStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
}

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

interface CustomHeaderProps {
    title?: string;
}

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    variant?: "underline" | "pill";
}

interface ProfileFieldProps {
    label: string;
    value: string;
    icon: ImageSourcePropType;
}

