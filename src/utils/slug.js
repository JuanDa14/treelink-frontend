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

export const generateUsername = (source = '') => {
	const base = slugifyUsername(source) || 'usuario';
	if (base.length >= 3 && base.length <= 24) {
		const suffix = Math.floor(100 + Math.random() * 900);
		return `${base}-${suffix}`.slice(0, 30);
	}
	const suffix = Math.floor(1000 + Math.random() * 9000);
	return `usuario-${suffix}`;
};
