import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { InputFormik, LinkIconPicker, LinkPreviewCard, SwitchFormik, TextareaFormik } from '../components';
import { createUserLink } from '../redux';
import { Layout } from '../layouts';
import { newLinkSchema } from '../schemas';
import { Button } from '@/components/ui/button';

const INITIAL_VALUES = {
	name: '',
	url: '',
	description: '',
	featured: false,
	isActive: true,
	icon: 'link',
	file: null,
};

const NewLinkPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleNewLink = async (values) => {
		await dispatch(createUserLink(values));
		navigate('/', { replace: true });
	};

	return (
		<Layout>
			<div className='container max-w-5xl py-8 lg:py-10'>
				<Formik
					initialValues={INITIAL_VALUES}
					onSubmit={async (values, { setSubmitting }) => {
						await handleNewLink(values);
						setSubmitting(false);
					}}
					validationSchema={newLinkSchema}
				>
					{({ handleSubmit, values, isSubmitting }) => (
						<div className='grid items-start gap-8 lg:grid-cols-[1fr_300px]'>
							<motion.div
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								className='surface-panel p-6 sm:p-8'
							>
								<div className='mb-6 flex items-start gap-3'>
									<Button
										variant='ghost'
										size='icon'
										asChild
										className='mt-0.5 h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary'
									>
										<Link to='/' aria-label='Volver a enlaces'>
											<ArrowLeft className='h-5 w-5' />
										</Link>
									</Button>
									<div className='min-w-0 pt-0.5'>
										<h1 className='font-display text-2xl font-bold tracking-tight'>Nuevo enlace</h1>
										<p className='text-sm text-muted-foreground'>
											Elige un icono o sube tu propia imagen.
										</p>
									</div>
								</div>

								<form onSubmit={handleSubmit} noValidate className='space-y-5'>
									<InputFormik
										text='Nombre'
										name='name'
										type='text'
										placeholder='Instagram, LinkedIn, Portfolio...'
									/>
									<InputFormik
										text='URL'
										name='url'
										type='url'
										placeholder='https://instagram.com/username'
									/>
									<TextareaFormik
										text='Descripción (opcional)'
										name='description'
										placeholder='Ej: Sígueme para contenido diario'
									/>
									<LinkIconPicker disable={isSubmitting} />
									<div className='space-y-3'>
										<SwitchFormik
											name='featured'
											label='Destacar enlace'
											description='Se verá más grande y llamará más la atención en tu página.'
										/>
										<SwitchFormik
											name='isActive'
											label='Visible en página pública'
											description='Puedes ocultarlo temporalmente sin eliminarlo.'
										/>
									</div>
									<Button disabled={isSubmitting} className='w-full h-12' size='lg' type='submit'>
										{isSubmitting ? 'Creando...' : 'Añadir enlace'}
									</Button>
								</form>
							</motion.div>

							<div className='hidden lg:block'>
								<LinkPreviewCard {...values} />
							</div>
						</div>
					)}
				</Formik>
			</div>
		</Layout>
	);
};

export default NewLinkPage;
