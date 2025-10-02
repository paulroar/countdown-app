/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        'cinzel-decorative': ['"Cinzel Decorative"', 'serif'],
        display: ['"Rationale"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

