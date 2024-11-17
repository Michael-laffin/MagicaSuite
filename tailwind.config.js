/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        modalEntry: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
        },
        star: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.5) rotate(180deg)' },
          '100%': { transform: 'scale(1) rotate(360deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        modalEntry: 'modalEntry 0.2s ease-out',
        sparkle: 'sparkle 2s ease-in-out infinite',
        star: 'star 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite'
      },
      textShadow: {
        'glow': '0 0 10px rgba(255,255,255,0.5)'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(139, 92, 246, 0.4)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          'text-shadow': '0 0 10px rgba(255,255,255,0.5)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
