// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Or 'Plus Jakarta Sans' for a more modern tech look
        display: ["Syne", "sans-serif"], // Optional: For the big bold headings (Download "Syne" from Google Fonts)
      },
      colors: {
        primary: "#f59e0b", // The Amber-500 color used for accents
        dark: "#050505", // The deep black background
        card: "#0a0a0a", // Slightly lighter black for cards
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
