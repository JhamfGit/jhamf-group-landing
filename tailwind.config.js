/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: '#007FFF',
          glow: '#007FFF',
        },
        neon: {
          cyan: '#00F0FF',
          purple: '#7B2CBF',
        },
        obsidian: '#050510',
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/hero-bg.svg')", // Placeholder if needed
      }
    },
  },
  plugins: [],
}
