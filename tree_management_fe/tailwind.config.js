module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      spacing: {
        1: "1rem",
        2: "2rem",
        3: "3rem",
        4: "4rem",
        58: "5.8rem",
        59: "5.9rem",
      },
      colors: {
        "border-color": "#F0F0F0",
        primary: "#81B199",
        "button-color": "#9FABC6",
      },
    },
  },
  plugins: [],
};
