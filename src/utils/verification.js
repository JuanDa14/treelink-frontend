export const extractVerificationToken = ({ tokenParam = '', search = '', hash = '' }) => {
	if (tokenParam) {
		return decodeURIComponent(tokenParam).trim();
	}

	const query = new URLSearchParams(search);
	const fromQuery = query.get('token') || query.get('t');
	if (fromQuery) {
		return decodeURIComponent(fromQuery).trim();
	}

	if (hash) {
		const hashQuery = new URLSearchParams(hash.replace(/^#/, ''));
		const fromHash = hashQuery.get('token') || hashQuery.get('t');
		if (fromHash) {
			return decodeURIComponent(fromHash).trim();
		}
	}

	const legacyMatch = search.match(/token=([^&]+)/);
	if (legacyMatch?.[1]) {
		return decodeURIComponent(legacyMatch[1]).trim();
	}

	return null;
};
