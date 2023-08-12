import { useRef } from 'react';
import { ErrorMessage } from 'formik';

export const InputFileFormik = ({
	name,
	label,
	textButton,
	setFieldValue,
	disable,
	classNameText,
	classNameButton,
}) => {
	const imageRef = useRef(null);

	return (
		<div>
			<div className='flex items-start flex-col justify-center'>
				<label className={`${classNameText}`} htmlFor='image'>
					{label}
				</label>
				<input
					id='image'
					type='file'
					className='hidden'
					ref={imageRef}
					name={name}
					onChange={(e) => setFieldValue(name, e.target.files[0])}
				/>
				<div className='flex justify-between items-center w-full'>
					{imageRef.current && imageRef.current.files[0] ? (
						<p className='flex-1 flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
								/>
							</svg>
							<span className='capitalize text-sm flex-nowrap text-ellipsis overflow-hidden'>
								{imageRef.current.files[0].name}
							</span>
						</p>
					) : (
						<p className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
								/>
							</svg>
							<span className='capitalize text-sm'>Sin archivo seleccionado</span>
						</p>
					)}

					<button
						disabled={disable}
						type='button'
						className={`flex gap-2 border p-2 ${classNameButton}`}
						onClick={() => imageRef.current.click()}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
							/>
						</svg>
						{textButton}
					</button>
				</div>
			</div>
			<ErrorMessage name={name}>
				{(error) => (
					<span className='text-red-500 font-semibold text-start mt-1'>
						{error[0].toUpperCase() + error.slice(1)}
					</span>
				)}
			</ErrorMessage>
		</div>
	);
};
