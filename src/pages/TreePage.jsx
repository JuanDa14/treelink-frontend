import { LinkList, Spinner } from '../components';
import { useGetLinksUser } from '../hooks';

const TreePage = () => {
	const { imageURL, username } = useGetLinksUser();

	return (
		<>
			{imageURL ? (
				<main className='w-full bg-gray-300 h-screen'>
					<div className='mx-auto max-w-lg pt-20'>
						<div className='w-full flex flex-col items-center justify-center'>
							<img
								className='max-w-lg max-h-24 rounded-full'
								src={imageURL}
								alt={username}
							/>
							<span className='mt-3 capitalize font-bold text-gray-500 text-step-1'>
								{username}
							</span>
						</div>

						<div className='mt-5 rounded-lg text-gray-500'>
							<LinkList />
						</div>
					</div>
				</main>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default TreePage;
