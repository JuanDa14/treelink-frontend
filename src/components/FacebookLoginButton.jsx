import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const loadFacebookSDK = () =>
	new Promise((resolve) => {
		if (window.FB) {
			resolve(window.FB);
			return;
		}

		window.fbAsyncInit = () => {
			window.FB.init({
				appId: import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID,
				cookie: true,
				xfbml: false,
				version: 'v19.0',
			});
			resolve(window.FB);
		};

		if (!document.getElementById('facebook-jssdk')) {
			const script = document.createElement('script');
			script.id = 'facebook-jssdk';
			script.src = 'https://connect.facebook.net/es_ES/sdk.js';
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		}
	});

export const FacebookLoginButton = ({ onSuccess, disabled }) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		loadFacebookSDK().then(() => setReady(true));
	}, []);

	const handleLogin = () => {
		if (!window.FB) return;

		window.FB.login(
			(response) => {
				if (!response.authResponse) return;

				window.FB.api('/me', { fields: 'name,email,picture' }, (profile) => {
					if (profile?.email) {
						onSuccess({
							name: profile.name,
							email: profile.email,
							picture: { data: { url: profile.picture?.data?.url } },
						});
					}
				});
			},
			{ scope: 'email,public_profile' }
		);
	};

	return (
		<Button
			type='button'
			variant='outline'
			className='w-full bg-[#1877F2] text-white hover:bg-[#166FE5] hover:text-white border-0'
			onClick={handleLogin}
			disabled={disabled || !ready}
		>
			Continuar con Facebook
		</Button>
	);
};
