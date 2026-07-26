/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        bg:      'var(--c-bg)',
        surface: 'var(--c-surface)',
        'surface2': 'var(--c-surface2)',
        border:  'var(--c-border)',
        text:    'var(--c-text)',
        muted:   'var(--c-text-muted)',
        accent:  'var(--c-accent)',
        accent2: 'var(--c-accent2)',
        proof:   'var(--c-proof)',
        warning: 'var(--c-warning)',
        error:   'var(--c-error)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
        '9': 'var(--space-9)',
        '10': 'var(--space-10)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'base': 'var(--shadow-base)',
        'lg': 'var(--shadow-lg)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'base': 'var(--duration-base)',
        'slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'in': 'var(--ease-in)',
        'out': 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      fontSize: {
        '2xs':  'var(--text-2xs)',
        'xs':   'var(--text-xs)',
        'sm':   'var(--text-xs)',   // alias
        'base': 'var(--text-base)',
        'lg':   'var(--text-lg)',
        'xl':   'var(--text-xl)',
        '2xl':  'var(--text-2xl)',
        '3xl':  'var(--text-3xl)',
        '4xl':  'var(--text-4xl)',
      },
      maxWidth: {
        'measure': 'var(--measure)',
      },
      animation: {
        'fade-in':   'fade-in .5s ease both',
        float:       'float 4s ease-in-out infinite',
        shimmer:     'shimmer 3s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(calc(var(--space-7) * -1))' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'grid-white': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='64' height='64' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 64 0 L 0 0 0 64' fill='none' stroke='white' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
