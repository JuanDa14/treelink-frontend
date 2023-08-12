import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { verifiedEmail } from '../redux';
import { Spinner } from '../components';

const Verified = () => {
	const dispatch = useDispatch();

	const { verified } = useSelector((state) => state.auth);

	const { search } = useLocation();

	useEffect(() => {
		const token = search.split('=')[1];

		if (token) {
			dispatch(verifiedEmail(token));
		}
	}, []);

	return (
		<div className='h-screen w-full flex items-center'>
			<div className='container max-w-md mx-auto xl:max-w-4xl flex flex-row-reverse bg-white rounded-lg shadow overflow-hidden'>
				<div className='relative hidden xl:block xl:w-1/2 h-full'>
					<img
						className='absolute h-auto w-full object-cover'
						src='https://images.unsplash.com/photo-1541233349642-6e425fe6190e'
						alt='my zomato'
					/>
				</div>
				<div className='w-full xl:w-1/2 p-8'>
					<h1 className=' text-2xl font-bold'>Verificar Cuenta</h1>
					<div className='flex items-center gap-2 mt-2'>
						{verified ? (
							<span className='text-gray-600 text-sm'>
								Tu cuenta ha sido verificada, ahora puedes iniciar sesion.
							</span>
						) : (
							<>
								<span className='text-gray-600 text-sm'>
									Estamos verificando tu cuenta, esto puede tardar unos segundos...
								</span>
							</>
						)}
					</div>
					{verified ? (
						<div className='w-full flex flex-col gap-2 mt-2 items-center'>
							<Link
								to={'/auth/login'}
								className='w-full text-center bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 disabled:opacity-50'
							>
								Inicia Sesion
							</Link>
						</div>
					) : (
						<Spinner className='h-full pb-10' />
					)}
				</div>
			</div>
		</div>
	);
};

export default Verified;
