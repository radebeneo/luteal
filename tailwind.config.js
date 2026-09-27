/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Sampled from luteal-screens onboarding mockups
        primary: "#B98CDD", // lavender accent (progress bars, icon rings)
        blush: {
          DEFAULT: "#FBD9E3", // soft pink background
          50: "#FDF1F5",
          100: "#FCE7EF",
          200: "#FBD9E3",
        },
        plum: {
          DEFAULT: "#3F2E45", // deep plum (headings, primary buttons)
          100: "#5A4363",
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#fafafa",
          200: "#B98CDD",
        },
        gray: {
          100: "#878787",
          200: "#878787",
        },
        dark: {
          100: "#3F2E45",
        },
        error: "#F14141",
        success: "#2F9B65",
      },
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
        fredoka: ["Fredoka-Regular", "sans-serif"],
        "fredoka-light": ["Fredoka-Light", "sans-serif"],
        "fredoka-medium": ["Fredoka-Medium", "sans-serif"],
        "fredoka-semibold": ["Fredoka-SemiBold", "sans-serif"],
        "fredoka-bold": ["Fredoka-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};