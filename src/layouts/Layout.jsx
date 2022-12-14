import { Navbar, Footer } from '../components';

export const Layout = ({ children }) => {
	return (
		<div className='flex flex-col w-full h-screen'>
			<Navbar />
			<main className='px-2.5 flex-1 max-w-4xl mx-auto'>{children}</main>
			<Footer />
		</div>
	);
};
