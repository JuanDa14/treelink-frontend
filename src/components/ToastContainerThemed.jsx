import { ToastContainer } from 'react-toastify';
import { useTheme } from '@/providers/theme-provider';

export const ToastContainerThemed = () => {
	const { resolvedTheme } = useTheme();

	return (
		<ToastContainer
			autoClose={3000}
			position='bottom-right'
			draggable
			pauseOnFocusLoss={false}
			theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			toastClassName='treelink-toast'
			progressClassName='treelink-toast-progress'
		/>
	);
};
