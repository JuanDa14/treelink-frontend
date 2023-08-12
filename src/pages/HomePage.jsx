import { LinkList, ModalAlerta, ModalForm } from '../components';
import { Layout } from '../layouts';

export const HomePage = () => {
	return (
		<Layout classNameMain={'bg-gray-100'}>
			<LinkList />
			<ModalForm />
			<ModalAlerta />
		</Layout>
	);
};

export default HomePage;
