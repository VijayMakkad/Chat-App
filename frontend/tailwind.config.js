import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",      // Primary color
          50: "#EEF2FF",           // Lighter shade
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",          // Main primary
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",          // Darker shade
        },
        secondary: "#F43F5E",       // Another custom color
        accent: "#10B981",          // Accent color
      },
    },
  },
  plugins: [daisyui],
}