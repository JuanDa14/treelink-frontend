import { useEffect } from 'react';

const DEFAULT_TITLE = 'TreeLink';
const DEFAULT_DESCRIPTION =
	'TreeLink — Tu link en bio. Un solo enlace para compartir todo lo que creas, curas y vendes en tus redes sociales.';

const setMetaContent = (selector, attribute, name, content) => {
	let el = document.querySelector(selector);
	if (!content) return;

	if (!el) {
		el = document.createElement('meta');
		el.setAttribute(attribute, name);
		document.head.appendChild(el);
	}

	el.setAttribute('content', content);
};

export const usePageMeta = ({ title, description } = {}) => {
	useEffect(() => {
		const previousTitle = document.title;
		const descriptionMeta = document.querySelector('meta[name="description"]');
		const previousDescription = descriptionMeta?.getAttribute('content') ?? DEFAULT_DESCRIPTION;

		if (title) {
			document.title = title.includes('TreeLink') ? title : `${title} | TreeLink`;
		}

		const metaDescription = description || DEFAULT_DESCRIPTION;
		if (descriptionMeta) {
			descriptionMeta.setAttribute('content', metaDescription);
		}

		setMetaContent('meta[property="og:title"]', 'property', 'og:title', title || DEFAULT_TITLE);
		setMetaContent(
			'meta[property="og:description"]',
			'property',
			'og:description',
			metaDescription
		);

		return () => {
			document.title = previousTitle;
			if (descriptionMeta) {
				descriptionMeta.setAttribute('content', previousDescription);
			}
		};
	}, [title, description]);
};
