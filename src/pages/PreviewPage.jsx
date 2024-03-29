import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { LinkList } from '../components';
import { Layout } from '../layouts';

const PreviewPage = () => {
	const { imageURL, username } = useSelector((state) => state.auth.user);

	const [clipboard, setClipboard] = useState(false);

	const handleCopyLink = () => {
		const domain = import.meta.env.VITE_APP_LOCAL_URL;
		const link = `${domain}/user/${username}`;
		navigator.clipboard.writeText(link);
		toast.success('Link copiado al portapapeles');
		setClipboard(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setClipboard(false);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [clipboard]);

	return (
		<Layout>
			<div className='mt-5 text-step--1 max-w-4xl mx-auto'>
				<div className='flex flex-col justify-between items-center gap-2'>
					<button
						className='bg-gray-700 text-step--1 flex items-center gap-1 text-white hover:bg-gray-800 rounded py-2 px-3 font-medium transition-colors duration-300 ease-in-out'
						onClick={handleCopyLink}
					>
						{clipboard ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4.5 12.75l6 6 9-13.5'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
								/>
							</svg>
						)}
						Copiar link
					</button>
				</div>

				<div className='w-full flex flex-col items-center justify-center mt-5'>
					<img
						className='w-24 h-24 object-cover object-center rounded-full'
						src={imageURL}
						alt={username}
					/>
					<span className='mt-3 font-medium text-gray-700 text-step-1'>{username}</span>
				</div>

				<div className='mt-5'>
					<LinkList />
				</div>
			</div>
		</Layout>
	);
};

export default PreviewPage;
