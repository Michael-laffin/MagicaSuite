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
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'magic-particle': {
          '0%': { 
            transform: 'scale(1) translate(0px, 0px)',
            opacity: '0'
          },
          '50%': { 
            transform: 'scale(1.2) translate(var(--tx, 10px), var(--ty, -10px))',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'scale(0.8) translate(var(--tx2, 20px), var(--ty2, -20px))',
            opacity: '0'
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)'
          }
        }
      },
      animation: {
        modalEntry: 'modalEntry 0.2s ease-out',
        sparkle: 'sparkle 2s ease-in-out infinite',
        star: 'star 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
        'magic-particle': 'magic-particle 2s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(139, 92, 246, 0.4)',
        'glow-xl': '0 0 50px rgba(139, 92, 246, 0.5)',
        'glow-2xl': '0 0 70px rgba(139, 92, 246, 0.6)',
        'category': '0 0 25px var(--category-color, rgba(139, 92, 246, 0.4))'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'magic-pattern': 'url("/magic-pattern.svg")'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          'text-shadow': '0 0 10px rgba(255,255,255,0.5)'
        },
        '.text-shadow-lg': {
          'text-shadow': '0 0 15px rgba(255,255,255,0.7)'
        },
        '.backdrop-blur-2xl': {
          'backdrop-filter': 'blur(24px)'
        },
        '.bg-blur': {
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
