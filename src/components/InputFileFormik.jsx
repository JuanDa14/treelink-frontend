import { useRef } from 'react';
import { ErrorMessage } from 'formik';

export const InputFileFormik = ({ name, label, textButton, setFieldValue, disable }) => {
	const imageRef = useRef(null);

	return (
		<div>
			<div className='flex items-start flex-col justify-center'>
				<label className='block mb-2 font-semibold mt-1' htmlFor='image'>
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

				<button
					disabled={disable}
					type='button'
					className='flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-slate-800 border border-transparent rounded-md hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 gap-3'
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
