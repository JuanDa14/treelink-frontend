import { LinkList, ModalAlerta, ModalForm } from '../components';
import { Layout } from '../layouts';

export const HomePage = () => {
	return (
		<>
			<Layout>
				<div>
					<h1 className='capitalize text-gray-500 font-bold text-step-1 mb-3 text-center mt-5'>
						Tu <span className='text-blue-500'>arbol</span> de contactos en un solo lugar
					</h1>
					<LinkList />
				</div>

				<ModalForm />
				<ModalAlerta />
			</Layout>
		</>
	);
};

export default HomePage;
