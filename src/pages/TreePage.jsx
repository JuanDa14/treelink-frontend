import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkList, Spinner } from '../components';
import { useGetLinksUser } from '../hooks';
import { errorIsFalse } from '../redux/slices/uiSlice';

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
	}, [error]);

	return (
		<>
			{imageURL ? (
				<main className='w-full h-screen'>
					<div className='mx-auto max-w-lg pt-20'>
						<div className='w-full flex flex-col items-center justify-center'>
							<img
								className='max-w-lg max-h-24 rounded-full'
								src={imageURL}
								alt={username}
							/>
							<span className='mt-3 capitalize font-bold text-gray-500 text-step-1'>
								{username}
							</span>
						</div>

						<div className='mt-5 rounded-lg'>
							<LinkList />
						</div>
					</div>
				</main>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default TreePage;
