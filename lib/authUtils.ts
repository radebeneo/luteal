export const isValidEmailAddress = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const getAuthErrorMessage = (error: unknown, fallback: string) => {
    if (!error || typeof error !== "object") return fallback;

    const clerkError = error as {
        errors?: Array<{ longMessage?: string; message?: string }>;
        message?: string;
    };
    const firstError = clerkError.errors?.find((item) => item.longMessage || item.message);

    return firstError?.longMessage || firstError?.message || clerkError.message || fallback;
};