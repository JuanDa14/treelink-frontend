import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { TreeLinkLogo } from '../components/TreeLinkLogo';

export const AuthLayout = ({ children, title, subtitle, footer }) => {
	return (
		<div className='auth-gradient flex min-h-screen items-center justify-center p-4 md:p-8'>
			<div className='auth-orb auth-orb--one' aria-hidden />
			<div className='auth-orb auth-orb--two' aria-hidden />

			<div className='absolute right-4 top-4 z-10'>
				<ThemeToggle />
			</div>

			<div className='relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16'>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					className='hidden flex-col gap-6 px-4 lg:flex'
				>
					<TreeLinkLogo showText imageClassName='h-10 w-10' textClassName='text-xl' />

					<p className='text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
						Tu link en bio, reinventado
					</p>

					<h2 className='font-display max-w-lg text-4xl font-bold tracking-tight xl:text-[2.75rem]'>
						Un link para compartir{' '}
						<span className='text-primary'>todo</span> lo que creas.
					</h2>

					<p className='max-w-md text-base leading-relaxed text-muted-foreground'>
						TreeLink reúne tus redes, contactos y proyectos en un solo lugar. Personalízalo en
						minutos y compártelo donde quieras.
					</p>

					<div className='flex gap-10 pt-2'>
						<div className='stat-chip'>
							<p className='stat-chip-value'>1</p>
							<p className='stat-chip-label'>link para todo</p>
						</div>
						<div className='stat-chip'>
							<p className='stat-chip-value'>∞</p>
							<p className='stat-chip-label'>redes sociales</p>
						</div>
						<div className='stat-chip'>
							<p className='stat-chip-value'>0</p>
							<p className='stat-chip-label'>complicaciones</p>
						</div>
					</div>

					<motion.div
						className='mt-2 flex items-center gap-3 text-sm text-muted-foreground'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						<span className='badge-primary-icon flex h-9 w-9 items-center justify-center rounded-xl'>
							<Leaf className='h-4 w-4 text-primary' />
						</span>
						Crece tu presencia digital con un diseño limpio y memorable.
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
					className='mx-auto w-full max-w-md lg:max-w-none'
				>
					<div className='auth-panel'>
						<div className='mb-7 text-center lg:text-left'>
							<div className='mb-5 flex justify-center lg:hidden'>
								<TreeLinkLogo showText imageClassName='h-9 w-9' />
							</div>
							<h1 className='font-display text-2xl font-bold tracking-tight md:text-[1.75rem]'>
								{title}
							</h1>
							{subtitle && (
								<p className='mt-2 leading-relaxed text-muted-foreground'>{subtitle}</p>
							)}
						</div>
						{children}
						{footer && (
							<div className='mt-6 text-center text-sm text-muted-foreground'>
								{footer}
							</div>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
};
