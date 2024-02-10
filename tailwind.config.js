module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "primary-sky": "#39B7E8",
      "secondary-yellow": "#F7C116",
      black: "#000000",
      dark: "#10153C",
      light: "#FFFAF5",
      white: "#FFFFFF",
      gray: "#C8C8C8",
      "dark-gray": "#333333",
      orange: "#F57C4A"
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
