import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { ArrowLeft, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { InputFileFormik, InputFormik, LinkPreviewCard, SwitchFormik, TextareaFormik } from '../components';
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
			<div className='container py-8 max-w-5xl'>
				<Button variant='ghost' size='sm' asChild className='mb-6 rounded-full'>
					<Link to='/'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Volver
					</Link>
				</Button>

				<Formik
					initialValues={INITIAL_VALUES}
					onSubmit={async (values, { setSubmitting }) => {
						await handleNewLink(values);
						setSubmitting(false);
					}}
					validationSchema={newLinkSchema}
				>
					{({ handleSubmit, setFieldValue, values, isSubmitting }) => (
						<div className='grid lg:grid-cols-[1fr_320px] gap-8 items-start'>
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								className='rounded-3xl border-2 border-border bg-card p-8 shadow-sm'
							>
								<div className='flex items-center gap-3 mb-6'>
									<div className='flex h-12 w-12 items-center justify-center rounded-full badge-primary-icon'>
										<Link2 className='h-6 w-6 text-primary' />
									</div>
									<div>
										<h1 className='text-2xl font-bold tracking-tight'>Nuevo enlace</h1>
										<p className='text-sm text-muted-foreground'>
											Personaliza cómo se verá en tu página pública.
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
									<InputFileFormik
										disable={isSubmitting}
										textButton='Seleccionar imagen'
										label='Imagen del enlace'
										name='file'
										setFieldValue={setFieldValue}
									/>
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
