import { useDispatch, useSelector } from 'react-redux';
import { closeAlert, startLoading, finishLoading } from '../../redux/slices/uiSlice';
import { deletedUserLink } from '../../redux';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const ModalAlerta = () => {
	const dispatch = useDispatch();
	const { alert, loading } = useSelector((state) => state.ui);
	const { link } = useSelector((state) => state.link);

	return (
		<Dialog open={alert} onOpenChange={(open) => !open && dispatch(closeAlert())}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Eliminar hoja de contacto</DialogTitle>
					<DialogDescription>
						¿Estás seguro de que deseas eliminar <strong>{link?.name}</strong>? Esta acción no se puede deshacer.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='gap-2 sm:gap-0'>
					<Button variant='outline' disabled={loading} onClick={() => dispatch(closeAlert())}>
						Cancelar
					</Button>
					<Button
						variant='destructive'
						disabled={loading}
						onClick={async () => {
							dispatch(startLoading());
							await dispatch(deletedUserLink(link._id));
							dispatch(closeAlert());
							dispatch(finishLoading());
						}}
					>
						{loading ? 'Eliminando...' : 'Eliminar'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
