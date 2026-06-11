import { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { CheckCircle2, KeyRound, MailCheck } from 'lucide-react';

import { InputFormik } from './InputFormik';
import { Button } from '@/components/ui/button';
import {
	confirmPasswordReset,
	forgotPassword,
	resetPasswordWithCode,
	sendPasswordResetCode,
} from '../redux';
import { passwordResetCodeSchema } from '../schemas';

const CODE_FORM_INITIAL = { code: '', password: '', password2: '' };

export const PasswordResetFlow = ({ email, authenticated = false, onComplete }) => {
	const dispatch = useDispatch();
	const [step, setStep] = useState('idle');
	const [sendingCode, setSendingCode] = useState(false);

	const handleSendCode = async () => {
		setSendingCode(true);
		try {
			const result = authenticated
				? await dispatch(sendPasswordResetCode())
				: await dispatch(forgotPassword({ email }));

			if (result?.ok) {
				setStep('code');
			}
		} finally {
			setSendingCode(false);
		}
	};

	const handleConfirmReset = async (values, { setSubmitting }) => {
		const payload = {
			code: values.code.trim(),
			password: values.password,
		};

		const result = authenticated
			? await dispatch(confirmPasswordReset(payload))
			: await dispatch(resetPasswordWithCode({ email, ...payload }));

		setSubmitting(false);

		if (result?.ok) {
			setStep('done');
			onComplete?.();
		}
	};

	if (step === 'done') {
		return (
			<div className='rounded-2xl border-2 border-primary/30 bg-primary/5 px-4 py-4 space-y-2'>
				<div className='flex items-start gap-3'>
					<CheckCircle2 className='h-5 w-5 shrink-0 text-primary mt-0.5' />
					<div className='space-y-1'>
						<p className='text-sm font-semibold text-foreground'>Contraseña actualizada</p>
						<p className='text-sm text-muted-foreground'>
							Tu nueva contraseña ya está activa. Puedes seguir editando tu configuración.
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (step === 'code') {
		return (
			<div className='rounded-2xl border-2 border-border bg-secondary px-4 py-4 space-y-4'>
				<div className='flex items-start gap-3'>
					<MailCheck className='h-5 w-5 shrink-0 text-primary mt-0.5' />
					<p className='text-sm text-foreground'>
						Ingresa el código de 6 dígitos que enviamos a{' '}
						<span className='font-medium'>{email}</span>
					</p>
				</div>

				<Formik
					initialValues={CODE_FORM_INITIAL}
					validationSchema={passwordResetCodeSchema}
					onSubmit={handleConfirmReset}
				>
					{({ handleSubmit, isSubmitting, values, setFieldValue }) => (
						<form onSubmit={handleSubmit} noValidate className='space-y-3'>
							<div className='space-y-2'>
								<label htmlFor='reset-code' className='text-sm font-medium text-foreground'>
									Código de verificación
								</label>
								<input
									id='reset-code'
									name='code'
									type='text'
									inputMode='numeric'
									autoComplete='one-time-code'
									maxLength={6}
									placeholder='000000'
									value={values.code}
									onChange={(event) =>
										setFieldValue('code', event.target.value.replace(/\D/g, '').slice(0, 6))
									}
									className='flex h-12 w-full rounded-2xl border-2 border-border bg-background px-4 text-center text-2xl font-semibold tracking-[0.4em] text-foreground outline-none transition focus:border-primary'
								/>
							</div>
							<InputFormik
								text='Nueva contraseña'
								type='password'
								placeholder='••••••••'
								name='password'
							/>
							<InputFormik
								text='Confirmar contraseña'
								type='password'
								placeholder='••••••••'
								name='password2'
							/>
							<div className='flex flex-col gap-2 sm:flex-row'>
								<Button
									type='button'
									variant='outline'
									className='w-full sm:flex-1'
									disabled={sendingCode || isSubmitting}
									onClick={handleSendCode}
								>
									{sendingCode ? 'Reenviando...' : 'Reenviar código'}
								</Button>
								<Button disabled={isSubmitting} className='w-full sm:flex-1' type='submit'>
									{isSubmitting ? 'Guardando...' : 'Actualizar contraseña'}
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		);
	}

	return (
		<div className='rounded-2xl border-2 border-border bg-secondary px-4 py-4 space-y-3'>
			<div className='flex items-start gap-3'>
				<KeyRound className='h-5 w-5 shrink-0 text-primary mt-0.5' />
				<div className='space-y-1'>
					<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
						Contraseña
					</p>
					<p className='text-sm text-muted-foreground'>
						Te enviaremos un código a tu correo. Lo ingresas aquí mismo y defines tu nueva
						contraseña sin salir de la configuración.
					</p>
				</div>
			</div>
			<Button
				type='button'
				variant='outline'
				className='w-full'
				disabled={sendingCode}
				onClick={handleSendCode}
			>
				{sendingCode ? 'Enviando código...' : 'Enviar código de verificación'}
			</Button>
		</div>
	);
};
