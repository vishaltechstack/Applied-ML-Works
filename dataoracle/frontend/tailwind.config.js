/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via class

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },

    extend: {
      colors: {
        // Brand Colors
        oracle: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // Indigo (main)
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
        ai: {
          400: '#c084fc',
          500: '#a855f7', // Purple accent
          600: '#9333ea',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          800: '#1f2937',
          900: '#111827',
        }
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
      },

      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      backgroundImage: {
        'gradient-oracle': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        'gradient-ai': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      },

      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};