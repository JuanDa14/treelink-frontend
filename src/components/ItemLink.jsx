import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getLinkById } from '../redux/slices/linkSlice';
import { openAlert, openModal } from '../redux/slices/uiSlice';

export const ItemLink = ({ imageURL, name, url, _id }) => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const onNavigate = (url) => {
		if (pathname !== '/') {
			window.open(url, '_blank');
		}
	};

	return (
		<li
			onClick={() => onNavigate(url)}
			className={`flex bg-white rounded hover:cursor-pointer mb-3 shadow hover:shadow-md transition-shadow duration-300 ease-in-out ${
				pathname === '/' ? 'justify-between' : 'justify-center gap-3 '
			}`}
		>
			<div className='flex items-center gap-4'>
				<a href={url} target='_blank'>
					<img src={imageURL} alt={name} className='w-20 h-20 object-cover object-center' />
				</a>
				<span className='capitalize font-semibold text-sm'>{name}</span>
			</div>
			{pathname === '/' && (
				<div className='flex gap-4 items-center mr-4'>
					<button
						className='hover:scale-125 transition-transform duration-200 ease-in-out'
						title='Editar'
						type='button'
						onClick={() => {
							dispatch(getLinkById(_id));
							dispatch(openModal());
						}}
					>
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
								d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
							/>
						</svg>
					</button>

					<button
						className='hover:scale-125 transition-transform duration-200 ease-in-out'
						title='Eliminar'
						type='button'
						onClick={() => {
							dispatch(openAlert());
							dispatch(getLinkById(_id));
						}}
					>
						<svg
							className='w-6 h-6'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
							/>
						</svg>
					</button>

					<a
						title='Website'
						href={url}
						alt={name}
						target='_blank'
						className='hover:scale-125 transition-transform duration-200 ease-in-out'
					>
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
								d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
							/>
						</svg>
					</a>
				</div>
			)}
		</li>
	);
};
