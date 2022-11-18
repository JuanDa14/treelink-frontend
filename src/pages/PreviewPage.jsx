import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { LinkList } from '../components';
import { Layout } from '../layouts';

const PreviewPage = () => {
	const { imageURL, username } = useSelector((state) => state.auth.user);

	const handleCopyLink = () => {
		const domain = import.meta.env.VITE_APP_LOCAL_URL;
		const link = `${domain}/user/${username}`;
		navigator.clipboard.writeText(link);
		toast.success('Link copiado en el portapapeles');
	};

	return (
		<Layout>
			<div className='mt-5'>
				<h1 className='capitalize text-gray-500 font-bold text-step-1 mb-3 text-center'>
					previsualización de <span className='text-blue-500'>mi arbol</span> de contactos
				</h1>

				<div className='w-full flex justify-center mb-8'>
					<button
						className='bg-gray-800 text-center text-white text-step--1 rounded-lg py-2 px-3 font-semibold hover:bg-gray-700 transition-colors duration-300'
						onClick={handleCopyLink}
					>
						Obtener Link
					</button>
				</div>

				<div className='w-full flex flex-col items-center justify-center'>
					<img className='max-w-lg max-h-24 rounded-full' src={imageURL} alt={username} />
					<span className='mt-3 capitalize font-bold text-gray-500 text-step-1'>
						{username}
					</span>
				</div>

				<div className='mt-5'>
					<LinkList />
				</div>
			</div>
		</Layout>
	);
};

export default PreviewPage;
