import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ItemLink } from './ItemLink';
import { Spinner } from './Spinner';

export const LinkList = () => {
	const { links, loading } = useSelector((state) => state.link);

	return (
		<div className='h-full'>
			{links.length > 0 ? (
				<div className='max-w-lg mx-auto pt-5'>
					<ul>
						{links.map((link) => (
							<ItemLink key={link._id} {...link} />
						))}
					</ul>
				</div>
			) : loading ? (
				<div className='flex justify-center items-center h-full text-step-1 font-semibold text-gray-500 capitalize'>
					<Spinner className='h-full' />
				</div>
			) : (
				<div className='h-full'>
					<div className='flex items-center justify-center gap-1 h-full'>
						<p className='text-step-0 font-medium text-gray-700'>
							No tienes hojas, crea una nueva hoja
						</p>
						<Link
							className='underline text-step-0 font-medium text-gray-700'
							to={'/new-link'}
						>
							aquí
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
