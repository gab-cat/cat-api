/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/**/*.test.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e6f0ff',
          200: '#b4d3fe',
          300: '#82b6fd',
          400: '#5098fc',
          500: '#03449d',
          600: '#034caf',
          700: '#02367d',
          800: '#01214b',
          900: '#000b19',
        },
        grey: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        black: '#222',
        white: '#fff',
        red: {
          light: '#f8d7da',
          dark: '#842029',
        },
        green: {
          light: '#d1e7dd',
          dark: '#0f5132',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'small-text': '0.875rem',
        'extra-small-text': '0.7em',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
      },
      letterSpacing: {
        DEFAULT: '1px',
      },
      transitionDuration: {
        DEFAULT: '0.3s',
      },
      maxWidth: {
        DEFAULT: '1120px',
        fixed: '600px',
      },
      width: {
        'view-width': '90vw',
      },
      boxShadow: {
        'shadow-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'shadow-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'shadow-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'shadow-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
