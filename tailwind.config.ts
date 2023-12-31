import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        mobile: "50px",
        laptop: "70px",
      },
    },
    screens: {
      micro: "360px",
      mobile: "480px",
      tablet: "767px",
      laptop: "991px",
      desktop: "1280px",
      monitor: "1440px",
      ultra: "1800px",
    },
    colors: {
      transparent: "#090B0A00",
      black: "#090B0A",
      white: "#FFFFFF",
      grey: {
        1: "#E0E0E0",
        2: "#B8B8B8",
      },
      red: "#FF0000",
      element: {
        DEFAULT: "#F2f2f2",
        hover: "#EBEBEB",
        dark: "#8A8A8A",
      },
      filter: "#777777",
      green: {
        1: "#D1E1D1",
        2: "#33794F"
      }
    },
    fontSize: {
      h1: "42px",
      h2: "32px",
      h3: "24px",
      subtitle: "18px",
      small: "12px",
      body: "14px",
      large: "16px",
    },
    extend: {
      margin: {
        18: "4.5rem",
      },
    },
    letterSpacing: {
      normal: "0px",
      large: "1.92px",
      wide: "3.84px",
      widest: "4.32px",
    },
  },
};
