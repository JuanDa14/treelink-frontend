import { userApi } from '../api';
import { generateUsername, slugifyUsername } from './slug';

export const fetchAvailableUsername = async (source = '', currentUsername = '') => {
	const current = slugifyUsername(currentUsername);

	for (let attempt = 0; attempt < 8; attempt += 1) {
		const candidate = generateUsername(source);

		if (current && candidate === current) continue;

		try {
			const { data } = await userApi.get(`/check-username/${encodeURIComponent(candidate)}`, {
				params: current ? { current } : undefined,
			});

			if (data.available) return candidate;
		} catch {
			// siguiente intento
		}
	}

	const base = slugifyUsername(source) || 'usuario';
	const fallback = `${base.slice(0, 22)}-${Date.now().toString(36).slice(-4)}`.slice(0, 30);
	return fallback;
};
