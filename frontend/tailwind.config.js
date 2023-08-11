/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "Noto Sans TC", "sans-serif"],
    },
    container: {
      padding: "1rem",
      center: true,
      screens: {
        lg: "768px",
        xl: "768px",
        "2xl": "768px",
      },
    },
    extend: {
      height: {
        screen: ["100vh" /* fallback for Opera, IE and etc. */, "100svh"],
      },
    },
  },
  plugins: [],
};
