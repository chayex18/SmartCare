/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this to scan React components
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#e83a2d",
        primaryWhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
