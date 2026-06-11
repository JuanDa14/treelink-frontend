import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LinkList, Spinner, TreeProfileHeader } from '../components';
import { PublicFooter } from '../components/ui/Footer';
import { useGetLinksUser, usePageMeta } from '../hooks';
import { errorIsFalse } from '../redux/slices/uiSlice';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const TreePage = () => {
	useGetLinksUser();
	const { imageURL, username, name, bio, showBranding } = useSelector((state) => state.auth.user) || {};
	const { checking } = useSelector((state) => state.auth);
	const { error } = useSelector((state) => state.ui);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const pageTitle = name || username || 'TreeLink';
	const pageDescription = useMemo(() => {
		if (bio?.trim()) return bio.trim();
		if (name) return `Enlaces y perfil de ${name} en TreeLink`;
		return 'Descubre los enlaces de este perfil en TreeLink';
	}, [bio, name]);

	usePageMeta({ title: pageTitle, description: pageDescription });

	useEffect(() => {
		if (error) {
			navigate('/auth/login', { replace: true });
		}
		return () => {
			dispatch(errorIsFalse());
		};
	}, [error, navigate, dispatch]);

	if (checking || !username) {
		return <Spinner label='Cargando árbol...' />;
	}

	return (
		<div className='tree-page-bg'>
			<div className='absolute top-4 right-4 z-10'>
				<ThemeToggle />
			</div>
			<main className='relative z-10 max-w-md mx-auto px-5 py-14 sm:py-20'>
				<TreeProfileHeader
					imageURL={imageURL}
					username={username}
					name={name}
					subtitle={bio}
				/>
				<LinkList publicView />
				{showBranding !== false && <PublicFooter />}
			</main>
		</div>
	);
};

export default TreePage;
