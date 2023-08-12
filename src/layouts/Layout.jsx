import { Navbar, Footer } from '../components';

export const Layout = ({ children, classNameMain }) => {
	return (
		<div className='flex flex-col w-full h-screen'>
			<Navbar />
			<main className={`flex-1 h-full w-full mx-auto ${classNameMain}`}>{children}</main>
			<Footer />
		</div>
	);
};
