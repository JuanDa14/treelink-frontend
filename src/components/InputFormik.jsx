import { useField, ErrorMessage } from 'formik';

export const InputFormik = ({ text, name, type, placeholder, classNameText, classNameInput }) => {
	const [{ onChange, value, ...fields }, { error, touched }] = useField(name);

	return (
		<div className='flex flex-col w-full mb-2'>
			{text && (
				<span
					className={`${classNameText ? classNameText : 'text-gray-500 font-semibold'} ${
						error && touched ? 'text-red-500' : ''
					}`}
				>
					{text}
				</span>
			)}
			<input
				{...fields}
				onChange={onChange}
				value={value}
				className={`${
					classNameInput ? classNameInput : 'px-3 py-2 mt-1 text-gray-700 border rounded-lg'
				} ${error && touched ? 'border-red-500' : ''}`}
				name={name}
				type={type}
				placeholder={placeholder}
			/>
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
