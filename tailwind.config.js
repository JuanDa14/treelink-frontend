import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'2xl': '1280px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'step--2': 'clamp(0.7rem, calc(0.87rem + -0.14vw), 0.84rem)',
				'step--1': 'clamp(0.94rem, calc(0.95rem + -0.01vw), 0.94rem)',
				'step-0': 'clamp(1.06rem, calc(1.03rem + 0.19vw), 1.25rem)',
				'step-1': 'clamp(1.2rem, calc(1.1rem + 0.47vw), 1.67rem)',
				'step-2': 'clamp(1.35rem, calc(1.17rem + 0.88vw), 2.22rem)',
				'step-3': 'clamp(1.51rem, calc(1.22rem + 1.45vw), 2.96rem)',
				'step-4': 'clamp(1.7rem, calc(1.25rem + 2.25vw), 3.95rem)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in': 'fade-in 0.4s ease-out forwards',
			},
			gridTemplateColumns: {
				'fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
				'fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
			},
		},
	},
	plugins: [tailwindcssAnimate],
};
