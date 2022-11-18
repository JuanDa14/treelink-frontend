import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ItemLink } from './ItemLink';

export const LinkList = () => {
	const { links } = useSelector((state) => state.link);

	return (
		<>
			{links.length > 0 ? (
				<div className='shadow mt-5 rounded-lg text-gray-500 -z-10'>
					<ul>
						{links.map((link) => (
							<ItemLink key={link._id} {...link} />
						))}
					</ul>
				</div>
			) : (
				<div className='flex flex-col justify-center text-step-1 text-center h-full'>
					<p className='font-semibold text-gray-500'>
						<span className='text-red-500'>No</span> tienes hojas en tu arbol
					</p>
					<span className='font-medium text-gray-500'>
						Comienza a crearlas facilmente aqui{' '}
						<Link
							to={'/new-link'}
							className='font-semibold text-blue-500 cursor-pointer hover:underline'
						>
							Crear Hoja
						</Link>
					</span>
				</div>
			)}
		</>
	);
};
