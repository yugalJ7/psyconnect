/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "100vh-h-12": "calc(100vh - 50px)",
      },
    },
  },
  plugins: [],
};
