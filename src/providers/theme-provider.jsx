import { createContext, useContext, useEffect, useState } from 'react';

const ThemeProviderContext = createContext({
	theme: 'system',
	resolvedTheme: 'light',
	setTheme: () => null,
});

const getSystemTheme = () =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const resolveTheme = (theme) => (theme === 'system' ? getSystemTheme() : theme);

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'treelink-theme', ...props }) {
	const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
	const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(theme));

	useEffect(() => {
		const root = window.document.documentElement;
		const next = resolveTheme(theme);

		root.classList.remove('light', 'dark');
		root.classList.add(next);
		setResolvedTheme(next);
	}, [theme]);

	useEffect(() => {
		if (theme !== 'system') return undefined;

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => {
			const root = window.document.documentElement;
			const next = getSystemTheme();
			root.classList.remove('light', 'dark');
			root.classList.add(next);
			setResolvedTheme(next);
		};

		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, [theme]);

	const value = {
		theme,
		resolvedTheme,
		setTheme: (newTheme) => {
			localStorage.setItem(storageKey, newTheme);
			setThemeState(newTheme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
	return context;
};
