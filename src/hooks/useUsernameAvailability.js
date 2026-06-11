import { useEffect, useState } from 'react';

import { userApi } from '../api';
import { slugifyUsername, USERNAME_REGEX } from '../utils/slug';
import { useDebounce } from './useDebounce';

export const USERNAME_STATUS = {
	IDLE: 'idle',
	CHECKING: 'checking',
	AVAILABLE: 'available',
	TAKEN: 'taken',
	INVALID: 'invalid',
};

export const useUsernameAvailability = (username, currentUsername = '') => {
	const [status, setStatus] = useState(USERNAME_STATUS.IDLE);
	const debouncedUsername = useDebounce(slugifyUsername(username), 450);

	useEffect(() => {
		const slug = debouncedUsername;
		const current = slugifyUsername(currentUsername);

		if (!slug) {
			setStatus(USERNAME_STATUS.IDLE);
			return;
		}

		if (slug.length < 3) {
			setStatus(USERNAME_STATUS.IDLE);
			return;
		}

		if (!USERNAME_REGEX.test(slug)) {
			setStatus(USERNAME_STATUS.INVALID);
			return;
		}

		if (current && slug === current) {
			setStatus(USERNAME_STATUS.AVAILABLE);
			return;
		}

		let cancelled = false;
		setStatus(USERNAME_STATUS.CHECKING);

		userApi
			.get(`/check-username/${encodeURIComponent(slug)}`, {
				params: current ? { current } : undefined,
			})
			.then(({ data }) => {
				if (cancelled) return;
				setStatus(data.available ? USERNAME_STATUS.AVAILABLE : USERNAME_STATUS.TAKEN);
			})
			.catch(() => {
				if (!cancelled) setStatus(USERNAME_STATUS.IDLE);
			});

		return () => {
			cancelled = true;
		};
	}, [debouncedUsername, currentUsername]);

	return { status, slug: debouncedUsername };
};
