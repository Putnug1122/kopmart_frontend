module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#4A72FF",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
    },
  },
  plugins: [],
};
