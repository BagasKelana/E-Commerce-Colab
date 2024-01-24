/*eslint-env node*/

/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            dropShadow: {
                glow: [
                    '0 0px 20px rgba(255,255, 255, 0.35)',
                    '0 0px 65px rgba(255, 255,255, 0.2)'
                ]
            },
            boxShadow: {
                border: '0px 4px 10px 0px rgba(0, 0, 0, 0.3)',
                'border-sm': '0px 4px 10px -2px rgba(0, 0, 0, 0.3)',
                'border-md': '0px 4px 10px 2px rgba(0, 0, 0, 0.3)',
                'border-xl': '0px 4px 10px 4px rgba(0, 0, 0, 0.3)'
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 }
                },
                'up-down': {
                    '0%': { transform: 'translateY(-10%)' },
                    '50%': { transform: 'none' },
                    '100%': { transform: 'translateY(-10%)' }
                },
                'ligh-on': {
                    '0%': { filter: 'saturate(200%)' },
                    '50%': { filter: 'saturate(50%)' },
                    '100%': { filter: 'saturate(200%)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'up-down': 'up-down 1.5s ease-in-out infinite',
                'ligh-on': 'ligh-on 1.5s ease-in infinite'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
};
