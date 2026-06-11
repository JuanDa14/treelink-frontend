export const Footer = () => {
	return (
		<footer className='border-t py-6 mt-auto'>
			<p className='text-center text-sm text-muted-foreground'>
				&copy; {new Date().getFullYear()} TreeLink. Todos los derechos reservados.
			</p>
		</footer>
	);
};
