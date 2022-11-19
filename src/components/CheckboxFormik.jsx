import { ErrorMessage, useField } from 'formik';

export const CheckboxFormik = ({ label, ...props }) => {
	const [field] = useField({ ...props, type: 'checkbox' });

	return (
		<div>
			<div className='flex items-center '>
				<input
					type='checkbox'
					{...field}
					{...props}
					className='w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-lg'
				/>
				<label htmlFor={props.id || props.name} className='font-semibold'>
					{label}
				</label>
			</div>
			<ErrorMessage name={props.name}>
				{(error) => (
					<span className='text-red-500 font-semibold text-start mt-1'>
						{error[0].toUpperCase() + error.slice(1)}
					</span>
				)}
			</ErrorMessage>
		</div>
	);
};
