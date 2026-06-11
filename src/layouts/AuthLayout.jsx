import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trees } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import ImageBackground from '../public/images/background.webp';

export const AuthLayout = ({ children, title, subtitle, footer }) => {
	return (
		<div className='min-h-screen auth-gradient flex items-center justify-center p-4'>
			<div className='absolute top-4 right-4'>
				<ThemeToggle />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-2xl border bg-card shadow-xl'
			>
				<div className='relative hidden lg:block min-h-[600px]'>
					<img className='absolute inset-0 h-full w-full object-cover' src={ImageBackground} alt='TreeLink' />
					<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
					<div className='absolute bottom-8 left-8 right-8 text-white'>
						<div className='flex items-center gap-2 mb-3'>
							<Trees className='h-6 w-6' />
							<span className='font-semibold text-lg'>TreeLink</span>
						</div>
						<p className='text-sm text-white/90'>
							Organiza tus redes y contactos en un árbol elegante, moderno y fácil de compartir.
						</p>
					</div>
				</div>

				<div className='p-8 md:p-10 flex flex-col justify-center'>
					<div className='mb-8'>
						<h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
						{subtitle && <p className='text-sm text-muted-foreground mt-2'>{subtitle}</p>}
					</div>
					{children}
					{footer && <div className='mt-6 text-sm text-muted-foreground'>{footer}</div>}
				</div>
			</motion.div>

			<Link to='/' className='sr-only'>
				TreeLink
			</Link>
		</div>
	);
};
