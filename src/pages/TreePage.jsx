import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LinkList, Spinner, TreeProfileHeader } from '../components';
import { useGetLinksUser } from '../hooks';
import { errorIsFalse } from '../redux/slices/uiSlice';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const TreePage = () => {
	const { imageURL, username } = useGetLinksUser();
	const { error } = useSelector((state) => state.ui);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			navigate('/auth/login', { replace: true });
		}
		return () => {
			dispatch(errorIsFalse());
		};
	}, [error, navigate, dispatch]);

	if (!imageURL) {
		return <Spinner label='Cargando árbol...' />;
	}

	return (
		<div className='tree-page-bg'>
			<div className='absolute top-4 right-4 z-10'>
				<ThemeToggle />
			</div>
			<main className='relative z-10 max-w-md mx-auto px-5 py-14 sm:py-20'>
				<TreeProfileHeader imageURL={imageURL} username={username} />
				<LinkList publicView />
				<p className='text-center text-xs text-muted-foreground mt-10'>
					Creado con <span className='font-semibold text-primary'>TreeLink</span>
				</p>
			</main>
		</div>
	);
};

export default TreePage;
