import { LinkList, ModalAlerta, ModalForm } from '../components';
import { Layout } from '../layouts';

export const HomePage = () => {
	return (
		<>
			<Layout>
				<LinkList />
				<ModalForm />
				<ModalAlerta />
			</Layout>
		</>
	);
};

export default HomePage;
