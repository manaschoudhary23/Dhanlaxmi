/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Core Luxury Palette ─────────────────────────────────────────
        ivory:        { DEFAULT: '#F8F5F0', dark: '#EDE9E2', light: '#FDFCFA' },
        sand:         { DEFAULT: '#E8DFD0', dark: '#D4C9B4', light: '#F2EDE4' },
        sage:         { DEFAULT: '#8A9E8C', deep: '#4E6652', light: '#B4C4B6', mist: '#E8EEE8' },
        stone:        { DEFAULT: '#8C8880', dark: '#5C5854', light: '#BCBAB6', pale: '#ECEAE8' },
        terracotta:   { DEFAULT: '#C4745A', light: '#E89A84', dark: '#9A5240', pale: '#F5E4DE' },
        charcoal:     { DEFAULT: '#252320', mid: '#3D3A36', light: '#6B6560' },
        mist:         '#D4CEC6',
        'warm-white': '#FDFCFA',

        // ── Functional Aliases ─────────────────────────────────────────
        bg:     '#F8F5F0',
        text:   '#252320',
        border: '#D4CEC6',
      },

      fontFamily: {
        display:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading:  ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel:   ['"Cinzel"', 'serif'],
        body:     ['"DM Sans"', 'system-ui', 'sans-serif'],
        sans:     ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:     ['"DM Mono"', 'monospace'],
      },

      fontSize: {
        'fluid-xs':   ['clamp(0.75rem,  1.2vw,  0.875rem)', { lineHeight: '1.6' }],
        'fluid-sm':   ['clamp(0.875rem, 1.5vw,  1rem)',     { lineHeight: '1.6' }],
        'fluid-base': ['clamp(1rem,     1.8vw,  1.125rem)', { lineHeight: '1.7' }],
        'fluid-lg':   ['clamp(1.125rem, 2vw,    1.25rem)',  { lineHeight: '1.6' }],
        'fluid-xl':   ['clamp(1.25rem,  2.5vw,  1.5rem)',   { lineHeight: '1.5' }],
        'fluid-2xl':  ['clamp(1.5rem,   3vw,    2rem)',     { lineHeight: '1.4' }],
        'fluid-3xl':  ['clamp(2rem,     4vw,    3rem)',     { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'fluid-4xl':  ['clamp(2.5rem,   5vw,    4rem)',     { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'fluid-5xl':  ['clamp(3rem,     6vw,    5.5rem)',   { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'fluid-6xl':  ['clamp(3.5rem,   8vw,    7.5rem)',   { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'fluid-7xl':  ['clamp(4rem,    10vw,   10rem)',     { lineHeight: '0.95', letterSpacing: '-0.035em' }],
      },

      boxShadow: {
        'card':        '0 1px 3px rgba(37,35,32,0.04), 0 20px 60px rgba(37,35,32,0.06)',
        'card-hover':  '0 2px 6px rgba(37,35,32,0.06), 0 32px 80px rgba(37,35,32,0.10)',
        'card-lg':     '0 4px 12px rgba(37,35,32,0.06), 0 40px 100px rgba(37,35,32,0.10)',
        'glass':       '0 8px 40px rgba(37,35,32,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
        'glass-dark':  '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
        'sage':        '0 0 0 1px rgba(138,158,140,0.3), 0 16px 48px rgba(78,102,82,0.15)',
        'terracotta':  '0 0 0 1px rgba(196,116,90,0.3), 0 16px 48px rgba(196,116,90,0.15)',
        'inner-sm':    'inset 0 1px 4px rgba(37,35,32,0.06)',
      },

      backgroundImage: {
        'hero-vignette':    'radial-gradient(ellipse at center, transparent 20%, rgba(37,35,32,0.5) 100%)',
        'hero-overlay-b':   'linear-gradient(to top, rgba(37,35,32,0.85) 0%, rgba(37,35,32,0.2) 50%, transparent 100%)',
        'hero-overlay-t':   'linear-gradient(to bottom, rgba(37,35,32,0.5) 0%, transparent 40%)',
        'section-warm':     'linear-gradient(135deg, #F8F5F0 0%, #EDE9E2 100%)',
        'section-sage':     'linear-gradient(135deg, #E8EEE8 0%, #D0DDD2 100%)',
        'section-dark':     'linear-gradient(135deg, #252320 0%, #3D3A36 100%)',
        'section-terra':    'linear-gradient(135deg, #C4745A 0%, #9A5240 100%)',
        'card-overlay':     'linear-gradient(to top, rgba(37,35,32,0.9) 0%, rgba(37,35,32,0.3) 50%, transparent 100%)',
        'glass-white':      'linear-gradient(135deg, rgba(253,252,250,0.9), rgba(248,245,240,0.75))',
        'glass-dark-bg':    'linear-gradient(135deg, rgba(37,35,32,0.88), rgba(61,58,54,0.75))',
        'sage-gradient':    'linear-gradient(135deg, #8A9E8C, #4E6652)',
        'terra-gradient':   'linear-gradient(135deg, #C4745A, #9A5240)',
      },

      backdropBlur: {
        xs:   '2px',
        sm:   '6px',
        md:   '12px',
        lg:   '20px',
        xl:   '30px',
        '2xl':'40px',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },

      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },

      transitionTimingFunction: {
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-inout':'cubic-bezier(0.87, 0, 0.13, 1)',
        'circ-out':  'cubic-bezier(0, 0.55, 0.45, 1)',
        'luxury':    'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',   opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'reveal-up': {
          '0%':   { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0% 0 0 0)' },
        },
      },

      animation: {
        'fade-up':    'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':    'fade-in 0.6s ease both',
        'scale-in':   'scale-in 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'slide-up':   'slide-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        shimmer:      'shimmer 2.5s ease infinite',
        float:        'float 5s ease-in-out infinite',
        'pulse-ring':  'pulse-ring 1.8s ease-out infinite',
        'spin-slow':  'spin-slow 20s linear infinite',
        marquee:      'marquee 30s linear infinite',
        'reveal-up':  'reveal-up 1s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
