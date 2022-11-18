import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logoutUser } from '../../redux';
import {
	openProfile,
	changeStateMenu,
	changeStateMenuMobile,
	closeMenu,
} from '../../redux/slices/uiSlice';

import { ModalProfile } from '../modal';

export const Navbar = () => {
	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const { menu, menuMobile } = useSelector((state) => state.ui);

	const { name, email, imageURL } = useSelector((state) => state.auth.user);

	return (
		<nav className='border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-900'>
			<div className='container flex flex-wrap justify-between items-center mx-auto'>
				<Link to={'/'} className='flex items-center'>
					<img
						src='https://flowbite.com/docs/images/logo.svg'
						className='mr-3 h-6 sm:h-9'
						alt='Logo'
					/>
					<span className='self-center text-xl font-semibold whitespace-nowrap text-white'>
						Treelink
					</span>
				</Link>
				<div className='flex items-center md:order-2'>
					<button
						onClick={() => dispatch(changeStateMenu())}
						type='button'
						className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0'
					>
						<span className='sr-only'>Open user menu</span>
						<img className='w-10 h-10 rounded-full' src={imageURL} alt='user' />
					</button>
					{/* <!-- Dropdown menu --> */}
					<div
						className={`${
							menu ? '' : 'hidden'
						} z-50 my-4 text-base list-none rounded divide-y shadow bg-gray-700 divide-gray-600 absolute right-1 top-12`}
					>
						<div className='py-3 px-4'>
							<span className='block text-sm text-white'>{name}</span>
							<span className='block text-sm font-mediumtruncate text-gray-400'>
								{email}
							</span>
						</div>
						<ul className='py-1' aria-labelledby='user-menu-button'>
							<li>
								<Link
									to={'/'}
									className='w-full  text-start h-full block py-2 px-4 text-sm text-white bg-gray-700 hover:bg-gray-600'
								>
									Inicio
								</Link>
							</li>
							<li>
								<button
									onClick={() => {
										dispatch(closeMenu());
										dispatch(openProfile());
									}}
									className='w-full  text-start h-full block py-2 px-4 text-sm text-white bg-gray-700 hover:bg-gray-600'
								>
									Perfil
								</button>
							</li>
							<li>
								<button
									onClick={() => dispatch(logoutUser())}
									className='w-full  text-start h-full block py-2 px-4 text-sm text-white bg-gray-700 hover:bg-gray-600'
								>
									Salir
								</button>
							</li>
						</ul>
					</div>
					<button
						onClick={() => dispatch(changeStateMenuMobile())}
						type='button'
						className='inline-flex items-center p-2 ml-1 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600'
					>
						<span className='sr-only'>Abrir menu</span>
						<svg
							className='w-6 h-6'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'></path>
						</svg>
					</button>
				</div>
				<div
					className={`${
						menuMobile ? '' : 'hidden'
					} justify-between items-center w-full md:flex md:w-auto md:order-1`}
					id='mobile-menu-2'
				>
					<ul className='flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700'>
						<li>
							<Link
								to={'/'}
								className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparen md:p-0 ${
									pathname === '/' ? 'text-blue-600' : ''
								} ${menuMobile ? 'hover:bg-blue-600 hover:text-white' : ''}`}
							>
								Inicio
							</Link>
						</li>
						<li>
							<Link
								to={'/new-link'}
								className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparen md:p-0 ${
									pathname === '/new-link' ? 'text-blue-600' : ''
								} ${menuMobile ? 'hover:bg-blue-600 hover:text-white' : ''}`}
							>
								Crear hoja
							</Link>
						</li>
						<li>
							<Link
								to={'/preview'}
								className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparen md:p-0 ${
									pathname === '/preview' ? 'text-blue-600' : ''
								} ${menuMobile ? 'hover:bg-blue-600 hover:text-white' : ''}`}
							>
								Mi arbol
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<ModalProfile />
		</nav>
	);
};
