import { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export const GoogleLoginButton = ({ onSuccess, onError, mode = 'signin' }) => {
	const containerRef = useRef(null);
	const [width, setWidth] = useState(320);

	useEffect(() => {
		const node = containerRef.current;
		if (!node) return undefined;

		const updateWidth = () => setWidth(node.offsetWidth || 320);
		updateWidth();

		const observer = new ResizeObserver(updateWidth);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} className='google-login-btn w-full'>
			<GoogleLogin
				onSuccess={onSuccess}
				onError={onError}
				useOneTap={false}
				theme='outline'
				size='large'
				text={mode === 'signup' ? 'signup_with' : 'signin_with'}
				shape='pill'
				width={width}
				locale='es'
			/>
		</div>
	);
};
