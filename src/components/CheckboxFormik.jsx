import { ErrorMessage, useField } from 'formik';

export const CheckboxFormik = ({ label, ...props }) => {
	const [field, { error, touched }] = useField({ ...props, type: 'checkbox' });

	return (
		<div>
			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					{...field}
					{...props}
					className='w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-lg'
				/>
				<label
					htmlFor={props.id || props.name}
					className={`text-sm ${error && touched && 'text-red-500'}`}
				>
					{label}
				</label>
			</div>
			{/* <ErrorMessage name={props.name}>
				{(error) => (
					<span className='text-red-500 text-start mt-1 text-sm'>
						{error[0].toUpperCase() + error.slice(1)}
					</span>
				)}
			</ErrorMessage> */}
		</div>
	);
};
