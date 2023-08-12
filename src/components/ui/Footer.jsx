export const Footer = () => {
	return (
		<footer className='w-full shadow border-t py-4'>
			<p className='font-medium text-center text-step--1'>
				&copy; {new Date().getFullYear()} TreeLink. Todos los derechos reservados.
			</p>
		</footer>
	);
};
