import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx,json}',
  ],
  // Safelist for dynamic classes
  safelist: [
    'animate-fadeInUp',
    'animate-pulse',
    'brandColorPrimary',
    'brandColorAccent',
    'brandColorBackground',
    'brandColorText',
    'brandColorSecondary',
    'brandColorCard',
    'brandColorBorder',
  ],
  theme: {
    extend: {
      colors: {
        brandColorPrimary: 'var(--brand-primary)', // Red-500 for accents
        brandColorAccent: 'var(--brand-accent)', // Red-600 for hover states
        brandColorBackground: 'var(--brand-background)', // Dynamic background
        brandColorText: 'var(--brand-text)', // Dynamic text
        brandColorSecondary: 'var(--brand-secondary)', // Dynamic secondary text
        brandColorCard: 'var(--brand-card)', // Dynamic cards
        brandColorBorder: 'var(--brand-border)', // Dynamic borders
      },
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        // Override default breakpoints for better responsive control
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config