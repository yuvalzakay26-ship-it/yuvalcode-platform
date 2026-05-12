/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark surface system - Calm Luxury
        background: "#030407",
        surface: "#0A0B10",
        ink: {
          DEFAULT: "#FAFAFA",
          muted: "#A1A1AA",
          dim: "#52525B",
        },
        primary: {
          DEFAULT: "#E4E4E7", // Restrained silver
          200: "#FAFAFA",
          300: "#F4F4F5",
          400: "#E4E4E7",
          500: "#D4D4D8",
          600: "#A1A1AA",
        },
        secondary: {
          DEFAULT: "#A1A1AA", // Muted titanium
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
        },
        accent: {
          DEFAULT: "#71717A",
          200: "#D4D4D8",
          300: "#A1A1AA",
          400: "#71717A",
          500: "#52525B",
          600: "#3F3F46",
        },
        // Neutralize hardcoded neon classes system-wide
        purple: {
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
        },
        pink: {
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
        },
        indigo: {
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
        },
        signal: {
          green: "#10B981",
          amber: "#F59E0B",
        },
        // Course-scoped palettes. Use these for Core Learning Shell theming
        // instead of the neutralized indigo/amber tokens above.
        "claude-code": {
          50:  "#EEF0FF",
          100: "#DCE0FF",
          200: "#BCC2FF",
          300: "#9099FB",
          400: "#7B82F5",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#1F1B4D",
          950: "#13123A",
        },
        "claude-101": {
          50:  "#FFF7E6",
          100: "#FEEBC2",
          200: "#FDD98A",
          300: "#FBC25A",
          400: "#F9AE34",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#7C3D04",
          900: "#3E1F02",
        },
      },
      fontFamily: {
        sans: ['Heebo', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Heebo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "gradient-x": "gradient-x 6s ease infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
