import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { LinkList, Spinner } from '../components';
import { useGetLinksUser } from '../hooks';
import { errorIsFalse } from '../redux/slices/uiSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
		<div className='min-h-screen auth-gradient'>
			<div className='absolute top-4 right-4'>
				<ThemeToggle />
			</div>
			<main className='max-w-lg mx-auto px-4 py-16'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='flex flex-col items-center mb-8'
				>
					<Avatar className='h-28 w-28 mb-4 ring-4 ring-primary/20 shadow-lg'>
						<AvatarImage src={imageURL} alt={username} />
						<AvatarFallback className='text-3xl'>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
					</Avatar>
					<h1 className='text-xl font-bold'>@{username}</h1>
				</motion.div>
				<LinkList />
			</main>
		</div>
	);
};

export default TreePage;
