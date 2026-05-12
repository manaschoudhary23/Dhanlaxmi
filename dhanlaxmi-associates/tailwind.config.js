/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core luxury palette
        ivory:    '#F7F5F2',
        'ivory-dark': '#F0EDE8',
        beige:    '#E8DFD1',
        'beige-dark': '#D6C9B4',
        white:    '#FFFFFF',
        charcoal: '#2E2E2E',
        'charcoal-light': '#3D3D3D',
        olive:    '#5B5B4F',
        'olive-light': '#7A7A6B',
        gold:     '#C6A66A',
        'gold-light': '#D4BC8E',
        'gold-dark':  '#A88540',
        'gold-pale':  '#F0E8D5',

        // Legacy aliases (keep existing components working during transition)
        primary:  '#FFFFFF',
        bg:       '#F7F5F2',
        accent:   '#C6A66A',
        text:     '#2E2E2E',
        border:   '#E0D9CF',
        pearl:    '#2E2E2E',
        ink:      '#1A1710',
      },

      fontFamily: {
        heading:  ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display:  ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cinzel:   ['"Cinzel"', 'serif'],
        body:     ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        sans:     ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(2.8rem, 6vw, 5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(2.2rem, 4vw, 4rem)',   { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        'display-md':  ['clamp(1.75rem, 3vw, 3rem)',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
      },

      boxShadow: {
        card:       '0 2px 0 rgba(0,0,0,0.02), 0 20px 60px rgba(44,40,30,0.08)',
        'card-hover': '0 2px 0 rgba(0,0,0,0.02), 0 30px 80px rgba(44,40,30,0.14)',
        gold:       '0 0 0 1px rgba(198,166,106,0.4), 0 16px 48px rgba(198,166,106,0.2)',
        'gold-sm':  '0 0 0 1px rgba(198,166,106,0.3), 0 8px 24px rgba(198,166,106,0.15)',
        glass:      '0 8px 32px rgba(44,40,30,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        inner:      'inset 0 2px 8px rgba(44,40,30,0.06)',
        // legacy
        luxe:       '0 1px 0 rgba(0,0,0,0.02), 0 18px 55px rgba(44,40,30,0.08)',
        luxeHover:  '0 1px 0 rgba(0,0,0,0.02), 0 26px 75px rgba(44,40,30,0.13)',
        accentGlow: '0 0 0 1px rgba(198,166,106,0.35), 0 14px 42px rgba(198,166,106,0.18)',
      },

      backgroundImage: {
        // Hero overlay — warm ivory from bottom
        'hero-overlay':     'linear-gradient(to top, rgba(247,245,242,0.92) 0%, rgba(247,245,242,0.2) 50%, transparent 100%)',
        'hero-overlay-mid': 'linear-gradient(180deg, rgba(247,245,242,0.1) 0%, rgba(47,40,28,0.55) 60%, rgba(30,24,14,0.8) 100%)',

        // Gold gradients
        'gold-radial':   'radial-gradient(ellipse at 30% 20%, rgba(198,166,106,0.22), transparent 60%)',
        'gold-shimmer':  'linear-gradient(90deg, transparent, rgba(198,166,106,0.35), transparent)',
        'gold-bar':      'linear-gradient(90deg, #C6A66A, #D4BC8E, #C6A66A)',

        // Luxury section backgrounds
        'luxury-warm':   'linear-gradient(135deg, #F7F5F2 0%, #EDE8DF 100%)',
        'luxury-dark':   'linear-gradient(135deg, #2E2E2E 0%, #1A1710 100%)',
        'ivory-gradient':'linear-gradient(180deg, #FFFFFF 0%, #F7F5F2 100%)',

        // Glass
        'glass-light':  'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(247,245,242,0.7))',
        'glass-dark':   'linear-gradient(135deg, rgba(47,40,28,0.85), rgba(30,24,14,0.7))',

        // accent-radial (legacy)
        'accent-radial': 'radial-gradient(800px circle at var(--x, 30%) var(--y, 20%), rgba(198,166,106,0.22), transparent 55%)',
      },

      backdropBlur: {
        xs: '2px',
        '2xl': '24px',
        '3xl': '40px',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },

      transitionTimingFunction: {
        luxury:    'cubic-bezier(0.22, 1, 0.36, 1)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(198,166,106,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(198,166,106,0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        shimmer:   'shimmer 2.5s ease infinite',
        float:     'float 4s ease-in-out infinite',
        pulseGold: 'pulseGold 2.5s ease-in-out infinite',
        fadeUp:    'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        fadeIn:    'fadeIn 0.5s ease both',
        scaleIn:   'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        slideLeft: 'slideLeft 0.4s cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
}
