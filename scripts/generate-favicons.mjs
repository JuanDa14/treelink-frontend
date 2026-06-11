import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public/tree-link.png');
const OUT_DIR = join(ROOT, 'public');

const PNG_SIZES = {
	'favicon-16x16.png': 16,
	'favicon-32x32.png': 32,
	'apple-touch-icon.png': 180,
	'android-chrome-192x192.png': 192,
	'android-chrome-512x512.png': 512,
};

const createCircleMask = (size) => {
	const center = size / 2;

	return Buffer.from(
		`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
			<circle cx="${center}" cy="${center}" r="${center}" fill="#ffffff"/>
		</svg>`
	);
};

const createRoundedIcon = async (size) => {
	const mask = createCircleMask(size);

	return sharp(SOURCE)
		.resize(size, size, { fit: 'cover' })
		.ensureAlpha()
		.composite([{ input: mask, blend: 'dest-in' }])
		.png()
		.toBuffer();
};

const main = async () => {
	const buffers = {};

	for (const [filename, size] of Object.entries(PNG_SIZES)) {
		buffers[filename] = await createRoundedIcon(size);
		await sharp(buffers[filename]).toFile(join(OUT_DIR, filename));
		console.log(`✓ ${filename}`);
	}

	const faviconIco = await toIco([buffers['favicon-16x16.png'], buffers['favicon-32x32.png']]);
	writeFileSync(join(OUT_DIR, 'favicon.ico'), faviconIco);
	console.log('✓ favicon.ico');

	const manifest = {
		name: 'TreeLink',
		short_name: 'TreeLink',
		description: 'Tu link en bio. Un solo enlace para compartir todo lo que creas.',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
		theme_color: '#059669',
		background_color: '#059669',
		display: 'standalone',
	};

	writeFileSync(join(OUT_DIR, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
	console.log('✓ site.webmanifest');
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
