import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ItemLink } from './ItemLink';

export const LinkList = () => {
	const { links } = useSelector((state) => state.link);

	const { pathname } = useLocation();

	return (
		<>
			{links.length > 0 ? (
				<div>
					{pathname === '/' && (
						<h1 className='capitalize text-gray-500 font-bold text-step-1 mb-3 text-center mt-5'>
							Tu <span className='text-blue-500'>arbol</span> de contactos en un solo lugar
						</h1>
					)}
					<div className='shadow mt-5 rounded-lg text-gray-500 -z-10'>
						<ul>
							{links.map((link) => (
								<ItemLink key={link._id} {...link} />
							))}
						</ul>
					</div>
				</div>
			) : (
				<div className='flex flex-col justify-center text-step-0 text-center h-full'>
					<p className='font-semibold text-gray-500'>
						<span className='text-red-500 font-bold'>No</span> tienes hojas en tu arbol
					</p>
					<span className='font-medium text-gray-500'>
						Comienza a crearlas facilmente aqui{' '}
						<Link
							to={'/new-link'}
							className='font-bold text-blue-500 cursor-pointer underline'
						>
							Nueva hoja
						</Link>
					</span>
				</div>
			)}
		</>
	);
};
