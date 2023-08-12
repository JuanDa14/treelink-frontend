import { useField, ErrorMessage } from 'formik';

export const InputFormik = ({
	text,
	name,
	type,
	placeholder,
	classNameText,
	classNameInput,
	classNameContainer,
}) => {
	const [{ onChange, value, ...fields }, { error }] = useField(name);

	return (
		<div className={`flex flex-col w-full mb-4 ${classNameContainer}`}>
			{text && <label className={`${classNameText} ${error && 'text-red-500'}`}>{text}</label>}
			<input
				{...fields}
				onChange={onChange}
				value={value}
				className={`px-3 py-2 border rounded-lg text-black ${classNameInput} ${
					error && 'border-red-500 border'
				}`}
				name={name}
				type={type}
				placeholder={placeholder}
			/>
			{/* <ErrorMessage name={name}>
				{(error) => (
					<span className='text-red-500 text-start mt-1 text-sm'>
						{error[0].toUpperCase() + error.slice(1)}
					</span>
				)}
			</ErrorMessage> */}
		</div>
	);
};
