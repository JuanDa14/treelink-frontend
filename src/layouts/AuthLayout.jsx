import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const AuthLayout = ({ children, title, subtitle, footer }) => {
	return (
		<div className='min-h-screen auth-gradient flex items-center justify-center p-4 md:p-8'>
			<div className='absolute top-4 right-4 z-10'>
				<ThemeToggle />
			</div>

			<div className='relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='hidden lg:flex flex-col gap-6 px-4'
				>
					<div className='inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium w-fit shadow-sm'>
						<Sparkles className='h-4 w-4 text-primary' />
						Tu link en bio, reinventado
					</div>
					<h2 className='text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1]'>
						Un link para compartir todo lo que creas.
					</h2>
					<p className='text-lg text-muted-foreground max-w-md leading-relaxed'>
						TreeLink reúne tus redes, contactos y proyectos en un solo lugar. Personalízalo en minutos y compártelo donde quieras.
					</p>
					<div className='flex gap-8 pt-2'>
						<div>
							<p className='text-2xl font-bold text-primary'>1 link</p>
							<p className='text-sm text-muted-foreground'>para todo</p>
						</div>
						<div>
							<p className='text-2xl font-bold text-primary'>∞</p>
							<p className='text-sm text-muted-foreground'>redes sociales</p>
						</div>
						<div>
							<p className='text-2xl font-bold text-primary'>0</p>
							<p className='text-sm text-muted-foreground'>complicaciones</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='w-full max-w-md mx-auto lg:max-w-none'
				>
					<div className='rounded-3xl border-2 border-border bg-card p-8 md:p-10 shadow-xl'>
						<div className='mb-8 text-center lg:text-left'>
							<Link to='/' className='inline-flex items-center gap-2 font-bold text-xl text-primary mb-6'>
								<span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm'>T</span>
								TreeLink
							</Link>
							<h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
							{subtitle && <p className='text-muted-foreground mt-2'>{subtitle}</p>}
						</div>
						{children}
						{footer && <div className='mt-6 text-sm text-muted-foreground text-center lg:text-left'>{footer}</div>}
					</div>
				</motion.div>
			</div>
		</div>
	);
};
