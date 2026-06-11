import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { ImagePlus, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LINK_ICON_OPTIONS } from '../constants/link-icons';
import { cn } from '@/lib/utils';

export const LinkIconPicker = ({ name = 'icon', fileName = 'file', label = 'Imagen o icono', disable }) => {
	const fileInputRef = useRef(null);
	const [field, , helpers] = useField(name);
	const [fileField, , fileHelpers] = useField(fileName);
	const [mode, setMode] = useState(field.value ? 'icon' : 'image');

	useEffect(() => {
		if (fileField.value) {
			setMode('image');
		} else if (field.value) {
			setMode('icon');
		}
	}, [field.value, fileField.value]);

	const selectIcon = (iconId) => {
		helpers.setValue(iconId);
		fileHelpers.setValue(null);
		setMode('icon');
	};

	const handleFileChange = (file) => {
		if (!file) return;
		fileHelpers.setValue(file);
		helpers.setValue('');
		setMode('image');
	};

	const selectedIcon = LINK_ICON_OPTIONS.find((option) => option.id === field.value);

	return (
		<div className='space-y-3'>
			<Label>{label}</Label>

			<div className='flex gap-1 p-1 rounded-full bg-secondary w-fit'>
				<button
					type='button'
					onClick={() => setMode('icon')}
					className={cn(
						'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
						mode === 'icon' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
					)}
				>
					Icono
				</button>
				<button
					type='button'
					onClick={() => setMode('image')}
					className={cn(
						'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
						mode === 'image' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
					)}
				>
					Imagen
				</button>
			</div>

			{mode === 'icon' ? (
				<div className='grid grid-cols-4 sm:grid-cols-6 gap-2'>
					{LINK_ICON_OPTIONS.map(({ id, label: iconLabel, Icon }) => (
						<button
							key={id}
							type='button'
							disabled={disable}
							title={iconLabel}
							onClick={() => selectIcon(id)}
							className={cn(
								'link-icon-option',
								field.value === id && 'link-icon-option-active'
							)}
						>
							<Icon className='h-5 w-5' />
						</button>
					))}
				</div>
			) : (
				<div className='rounded-2xl border-2 border-dashed border-border p-4'>
					<div className='flex items-center justify-between gap-4'>
						<div className='flex items-center gap-3'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-secondary'>
								<ImagePlus className='h-6 w-6 text-muted-foreground' />
							</div>
							<p className='text-sm text-muted-foreground'>PNG, JPG o WEBP (máx. 5MB)</p>
						</div>
						<div>
							<input
								ref={fileInputRef}
								type='file'
								accept='image/*'
								className='hidden'
								disabled={disable}
								onChange={(e) => handleFileChange(e.target.files?.[0])}
							/>
							<Button
								type='button'
								variant='outline'
								size='sm'
								disabled={disable}
								onClick={() => fileInputRef.current?.click()}
							>
								<Upload className='mr-2 h-4 w-4' />
								Subir imagen
							</Button>
						</div>
					</div>
				</div>
			)}

			{selectedIcon && mode === 'icon' && (
				<p className='text-xs text-muted-foreground'>
					Icono seleccionado: <span className='font-medium text-foreground'>{selectedIcon.label}</span>
				</p>
			)}
		</div>
	);
};
