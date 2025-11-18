/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--primary)",
        primary_01: "var(--primary-01)",
        secondary: "var(--secondary)",
        dimYellow: "var(--dimYellow)",
        dimYellow_01: "var(--dimYellow-01)",
        offWhite: "var(--offWhite)",
        dimGray: "var(--dimGray)",
        dimGray_01: "var(--dimGray-01)",
      },
      height: {
        10: "10px",
      },
      width: {
        10: "10px",
      },
      fontSize: {
        15: "15px",
      },
    },
  },
  plugins: [],
};
