export const Footer = () => {
	return (
		<footer className='border-t border-border/60 py-6 mt-auto bg-background'>
			<p className='text-center text-sm text-muted-foreground'>
				&copy; {new Date().getFullYear()} <span className='font-semibold text-foreground'>TreeLink</span>
			</p>
		</footer>
	);
};
