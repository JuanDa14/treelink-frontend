export const slugifyUsername = (value = '') => {
	return value
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 30);
};

export const buildPublicUrl = (username) => {
	const slug = slugifyUsername(username);
	const base = import.meta.env.VITE_APP_LOCAL_URL?.replace(/\/$/, '') || '';
	return `${base}/user/${encodeURIComponent(slug)}`;
};

export const USERNAME_REGEX = /^[a-z0-9][a-z0-9_-]*[a-z0-9]$|^[a-z0-9]{3}$/;
