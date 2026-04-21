import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        gold: {
          50:  '#fdf8ec',
          100: '#faedd0',
          200: '#f4d89c',
          300: '#ecbd5f',
          400: '#e4a332',
          500: '#c9a760',
          600: '#b8923f',
          700: '#966014',
          800: '#7a3e16',
          900: '#653416',
          950: '#3a1907',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        'bounce-in': {
          '0%':   { opacity: '0', transform: 'scale(0.55)' },
          '65%':  { opacity: '1', transform: 'scale(1.08)' },
          '85%':  {               transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'fade-in':   'fade-in 0.25s ease-out both',
        shimmer:     'shimmer 1.8s ease-in-out infinite',
        float:       'float 4s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'scale-in':  'scale-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'lift-sm': '0 4px 12px rgba(0,0,0,0.07)',
        lift:      '0 8px 24px rgba(0,0,0,0.10)',
        'lift-lg': '0 16px 48px rgba(0,0,0,0.13)',
        glass:     'inset 0 1px 0 rgba(255,255,255,0.65), 0 2px 8px rgba(0,0,0,0.06)',
        'glow-gold': '0 0 24px rgba(201,167,96,0.28)',
      },
    },
  },
  plugins: [],
}

export default config
