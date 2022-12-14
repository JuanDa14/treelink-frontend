import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getLinkById } from '../redux/slices/linkSlice';
import { openAlert, openModal } from '../redux/slices/uiSlice';

export const ItemLink = ({ imageURL, name, url, _id }) => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	return (
		<li
			className={`flex items-center p-5 font-medium bg-white rounded-lg
			transition-colors duration-300 ease-in-out shadow-lg mb-3 hover:cursor-pointer hover:bg-gray-100 ${
				pathname === '/' ? 'justify-between' : 'justify-center gap-3 '
			}`}
		>
			<a href={url} target='_blank' className='w-full flex  items-center gap-3 justify-center'>
				<figure>
					<img src={imageURL} alt={name} className='w-14 h-10 object-cover object-center' />
				</figure>
				<span className='text-black font-semibold capitalize'>{name}</span>
			</a>
			{pathname === '/' && (
				<div className='w-6/12 flex gap-5 items-center'>
					<button
						type='button'
						className='hover:bg-gray-200 rounded-full p-2 transition-colors duration-300 ease-in-out'
						onClick={() => {
							dispatch(getLinkById(_id));
							dispatch(openModal());
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
								d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
							/>
						</svg>
					</button>

					<button
						className='hover:bg-gray-200 rounded-full p-2 transition-colors duration-300 ease-in-out'
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

					{/* //TODO hacer un link que lleve a la ruta del usuario  */}

					<a
						className='hover:bg-gray-200 rounded-full p-2 transition-colors duration-300 ease-in-out'
						href={url}
						alt={name}
						target='_blank'
					>
						<svg
							aria-hidden='true'
							className='w-6 h-6'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
								clipRule='evenodd'
							></path>
						</svg>
					</a>
				</div>
			)}
		</li>
	);
};
