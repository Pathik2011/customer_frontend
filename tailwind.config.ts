// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 4. Add this line
        jakarta: ["var(--font-jakarta)", "sans-serif"], 
      },
      colors: {
        // Your existing colors...
      },
    },
  },
  plugins: [],
};
export default config;