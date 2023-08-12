import lottie from 'lottie-web';
import { useEffect } from 'react';

export default function Lottie({ className, path, idContainer }) {
	useEffect(() => {
		lottie.loadAnimation({
			container: document.getElementById(`lottie-${idContainer}`),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: `/src/public/lottie/${path}.json`,
		});
	}, []);

	return <div className={`${className}`} id={`lottie-${idContainer}`}></div>;
}
