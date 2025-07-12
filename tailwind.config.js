/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'from-yellow-400',
    'to-orange-500',
    'from-blue-400',
    'to-blue-500',
    'from-green-400',
    'to-teal-500',
    'from-red-400',
    'to-red-500',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#131424",
        secondary: "#393A47",
        accent: "#F13024",
      },
      backgroundImage: {
        site: 'url("/site-bg.svg")',
        collaboration: 'url("/cb.jpg")',
        casestudy: 'url("/case-study.jpg")',
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "orbit": "orbit 20s linear infinite",
        "pulse-scale": "pulseScale 2s ease-in-out infinite",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
        pulseScale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, "sans-serif"],
        sora: [`var(--font-sora)`, "sans-serif"],
      },
      container: {
        padding: {
          DEFAULT: "15px",
        },
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
