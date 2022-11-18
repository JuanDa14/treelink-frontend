import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { verifiedEmail } from '../redux';

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
		<div className='w-full h-screen flex items-center'>
			<div className='max-w-4xl mx-auto text-center bg-gray-700 rounded-lg p-10 text-white'>
				<h1 className='font-bold text-step-3'>
					Confirma tu cuenta y comienza a crear tu {''}
					<span className='text-blue-600 uppercase'>arbol de redes sociales </span>
				</h1>
				{verified ? (
					<span className=' text-step-1 flex flex-col gap-3 mt-5 capitalize'>
						Cuenta Confirmada, por favor...{'  '}
						<Link to={'/auth/login'} className='underline capitalize font-semibold block'>
							Inicia Sesion
						</Link>
					</span>
				) : (
					<span className=' text-step-1 flex flex-col gap-3 mt-5 capitalize'>
						Confirmando cuenta...{'  '}
					</span>
				)}
			</div>
		</div>
	);
};

export default Verified;
