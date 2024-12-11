module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A6EA9",
        secondary: "#DBEBFC",
        tertiary: "#34BCF4",
      },
      gridTemplateColumns: {
        equal: "repeat(auto-fit, minmax(0, 1fr))", 
      },
    },
  },
  plugins: [],
};
