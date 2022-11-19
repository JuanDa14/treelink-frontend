import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../redux';
import {
	openProfile,
	changeStateMenu,
	changeStateMenuMobile,
	closeMenu,
} from '../../redux/slices/uiSlice';

import { ModalProfile } from '../modal';

export const Navbar = () => {
	const dispatch = useDispatch();

	const { menu, menuMobile } = useSelector((state) => state.ui);

	const { name, email, imageURL } = useSelector((state) => state.auth.user);

	return (
		<nav className='border-gray-200 px-2 sm:px-4 py-2.5 bg-white shadow-lg'>
			<div className='container flex flex-wrap justify-between items-center mx-auto text-step-0'>
				<Link to={'/'}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='w-6 h-6 font-semibold'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
						/>
					</svg>
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
						} z-50 my-4 text-step--1 list-none rounded divide-y bg-white divide-gray-600 absolute right-1 top-12 shadow-lg border border-gray-200`}
					>
						<div className='py-3 px-4'>
							<span className='block'>{name}</span>
							<span className='block text-gray-500 font-semibold'>{email}</span>
						</div>
						<ul className='py-1'>
							<li>
								<Link
									to={'/'}
									className='w-full  text-start h-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
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
									className='w-full  text-start h-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
								>
									Perfil
								</button>
							</li>
							<li>
								<button
									onClick={() => dispatch(logoutUser())}
									className='w-full  text-start h-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
								>
									Salir
								</button>
							</li>
						</ul>
					</div>
					<button
						onClick={() => dispatch(changeStateMenuMobile())}
						type='button'
						className='inline-flex items-center p-2 ml-1 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='w-6 h-6'
						>
							<path
								fillRule='evenodd'
								d='M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				</div>
				<div
					className={`${
						menuMobile ? '' : 'hidden'
					} justify-between items-center w-full md:flex md:w-auto md:order-1`}
					id='mobile-menu-2'
				>
					<ul className='flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:border-0 text-step--1 font-bold'>
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									`py-2 pr-4 pl-3 rounded md:bg-transparen md:p-0 flex items-center gap-1 transition-colors duration-300 ${
										isActive ? 'text-blue-700' : ''
									} ${menuMobile ? 'hover:bg-blue-700 hover:text-white' : ''}`
								}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
									/>
								</svg>
								Inicio
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/new-link'}
								className={({ isActive }) =>
									`py-2 pr-4 pl-3 rounded md:bg-transparen md:p-0 flex items-center gap-1 transition-colors duration-300 ${
										isActive ? 'text-blue-700' : ''
									} ${menuMobile ? 'hover:bg-blue-700 hover:text-white' : ''}`
								}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
									/>
								</svg>
								Nuevo enlace
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/preview'}
								className={({ isActive }) =>
									`py-2 pr-4 pl-3 rounded md:bg-transparen md:p-0 flex items-center gap-1 transition-colors duration-300 ${
										isActive ? 'text-blue-700' : ''
									} ${menuMobile ? 'hover:bg-blue-700 hover:text-white' : ''}`
								}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z'
									/>
								</svg>
								Previsualizar
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
			<ModalProfile />
		</nav>
	);
};
