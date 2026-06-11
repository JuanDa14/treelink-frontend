import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { InputFileFormik, InputFormik } from '../components';
import { createUserLink } from '../redux';
import { Layout } from '../layouts';
import { newLinkSchema } from '../schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
				<Button variant='ghost' size='sm' asChild className='mb-4'>
					<Link to='/'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Volver
					</Link>
				</Button>

				<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
					<Card>
						<CardHeader>
							<CardTitle>Nueva hoja de contacto</CardTitle>
							<CardDescription>
								Añade un enlace con imagen para que aparezca en tu árbol público.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Formik
								initialValues={INITIAL_VALUES}
								onSubmit={async (values, { setSubmitting }) => {
									await handleNewLink(values);
									setSubmitting(false);
								}}
								validationSchema={newLinkSchema}
							>
								{({ handleSubmit, setFieldValue, isSubmitting }) => (
									<form onSubmit={handleSubmit} noValidate className='space-y-4'>
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
											label='Imagen de la hoja'
											name='file'
											setFieldValue={setFieldValue}
										/>
										<Button disabled={isSubmitting} className='w-full' type='submit'>
											{isSubmitting ? 'Creando...' : 'Crear hoja'}
										</Button>
									</form>
								)}
							</Formik>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</Layout>
	);
};

export default NewLinkPage;
