import { useSelector } from 'react-redux';

import { LinkList } from '../components';
import { Layout } from '../layouts';

const PreviewPage = () => {
	const { imageURL, username } = useSelector((state) => state.auth.user);

	return (
		<Layout>
			<div className='mt-5'>
				<h1 className='capitalize text-gray-500 font-bold text-step-1 mb-5 text-center'>
					previsualización de <span className='text-blue-500'>mi arbol</span> de contactos
				</h1>

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
