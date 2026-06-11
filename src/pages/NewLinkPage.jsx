import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { ArrowLeft, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { InputFileFormik, InputFormik } from '../components';
import { createUserLink } from '../redux';
import { Layout } from '../layouts';
import { newLinkSchema } from '../schemas';
import { Button } from '@/components/ui/button';

const INITIAL_VALUES = {
	name: '',
	url: '',
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
			<div className='container py-8 max-w-xl'>
				<Button variant='ghost' size='sm' asChild className='mb-6 rounded-full'>
					<Link to='/'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Volver
					</Link>
				</Button>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					className='rounded-3xl border-2 border-border bg-card p-8 shadow-sm'
				>
					<div className='flex items-center gap-3 mb-6'>
						<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
							<Link2 className='h-6 w-6 text-primary' />
						</div>
						<div>
							<h1 className='text-2xl font-bold tracking-tight'>Nuevo enlace</h1>
							<p className='text-sm text-muted-foreground'>
								Añade un link con imagen a tu página pública.
							</p>
						</div>
					</div>

					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleNewLink(values);
							setSubmitting(false);
						}}
						validationSchema={newLinkSchema}
					>
						{({ handleSubmit, setFieldValue, isSubmitting }) => (
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
								<InputFileFormik
									disable={isSubmitting}
									textButton='Seleccionar imagen'
									label='Imagen del enlace'
									name='file'
									setFieldValue={setFieldValue}
								/>
								<Button disabled={isSubmitting} className='w-full h-12' size='lg' type='submit'>
									{isSubmitting ? 'Creando...' : 'Añadir enlace'}
								</Button>
							</form>
						)}
					</Formik>
				</motion.div>
			</div>
		</Layout>
	);
};

export default NewLinkPage;
