import { FacebookLoginButton } from './FacebookLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

const COPY = {
	login: {
		divider: 'O inicia sesión con',
		googleMode: 'signin',
	},
	register: {
		divider: 'O regístrate con',
		googleMode: 'signup',
	},
};

export const AuthSocialSection = ({
	variant = 'login',
	onGoogleSuccess,
	onGoogleError,
	onFacebookSuccess,
	socialDisabled = false,
}) => {
	const copy = COPY[variant] || COPY.login;

	return (
		<>
			<div className='relative my-6'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t border-border' />
				</div>
				<div className='relative flex justify-center text-xs uppercase tracking-wide'>
					<span className='bg-card px-3 text-muted-foreground font-medium'>{copy.divider}</span>
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				<GoogleLoginButton
					mode={copy.googleMode}
					onSuccess={onGoogleSuccess}
					onError={onGoogleError}
				/>
				<FacebookLoginButton
					onSuccess={onFacebookSuccess}
					disabled={socialDisabled}
					label={variant === 'register' ? 'Registrarse con Facebook' : 'Continuar con Facebook'}
				/>
			</div>
		</>
	);
};
