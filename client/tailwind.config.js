/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      animation: {
        'gradient-move': 'gradient-move 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // ✅ line-clamp plugin added for product description truncation
  ],
}
