import { useRef } from 'react';
import { ErrorMessage } from 'formik';
import { ImagePlus, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const InputFileFormik = ({
	name,
	label,
	textButton = 'Subir imagen',
	setFieldValue,
	disable,
	classNameText,
	classNameButton,
	classNameContainer,
	value,
}) => {
	const imageRef = useRef(null);
	const previewImageRef = useRef(null);

	const handleChangeImage = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			if (previewImageRef.current) {
				previewImageRef.current.src = reader.result;
			}
		};
	};

	const previewSrc = imageRef.current?.files?.[0] ? null : value;

	return (
		<div className={cn('space-y-2', classNameContainer)}>
			{label && <Label className={classNameText}>{label}</Label>}
			<input
				id='image'
				type='file'
				accept='image/*'
				className='hidden'
				ref={imageRef}
				name={name}
				onChange={(e) => {
					const file = e.target.files[0];
					handleChangeImage(file);
					setFieldValue(name, file);
				}}
			/>
			<div className='flex items-center justify-between gap-4 rounded-lg border border-dashed p-4'>
				<div className='flex items-center gap-3'>
					{previewSrc || previewImageRef.current ? (
						<img
							ref={previewImageRef}
							src={previewSrc || undefined}
							alt='Vista previa'
							className='h-20 w-20 rounded-lg object-cover'
						/>
					) : (
						<div className='flex h-20 w-20 items-center justify-center rounded-lg bg-muted'>
							<ImagePlus className='h-6 w-6 text-muted-foreground' />
						</div>
					)}
					<p className='text-sm text-muted-foreground'>PNG, JPG o WEBP (máx. 5MB)</p>
				</div>
				<Button
					disabled={disable}
					type='button'
					variant='outline'
					size='sm'
					className={classNameButton}
					onClick={() => imageRef.current?.click()}
				>
					<Upload className='mr-2 h-4 w-4' />
					{textButton}
				</Button>
			</div>
			<ErrorMessage name={name}>
				{(error) => <span className='text-sm text-destructive'>{error}</span>}
			</ErrorMessage>
		</div>
	);
};
