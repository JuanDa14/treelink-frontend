import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { reorderUserLinks } from '../redux';
import { ItemLink } from './ItemLink';
import { Spinner } from './Spinner';
import { EmptyState } from './EmptyState';

export const LinkList = ({ sortable = false, publicView = false }) => {
	const dispatch = useDispatch();
	const { links, loading, reordering } = useSelector((state) => state.link);

	const visibleLinks = useMemo(() => {
		if (publicView) {
			return links.filter((link) => link.isActive !== false);
		}
		return links;
	}, [links, publicView]);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	const handleDragEnd = ({ active, over }) => {
		if (!over || active.id === over.id) return;

		const oldIndex = links.findIndex((link) => link._id === active.id);
		const newIndex = links.findIndex((link) => link._id === over.id);
		const reordered = arrayMove(links, oldIndex, newIndex);
		const linkIds = reordered.map((link) => link._id);

		dispatch(reorderUserLinks(linkIds));
	};

	if (loading) {
		return <Spinner className='min-h-[30vh]' label='Cargando enlaces...' />;
	}

	if (visibleLinks.length === 0) {
		return <EmptyState />;
	}

	if (!sortable) {
		return (
			<ul className='space-y-3 w-full'>
				{visibleLinks.map((link) => (
					<li key={link._id}>
						<ItemLink {...link} publicView={publicView} />
					</li>
				))}
			</ul>
		);
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={links.map((link) => link._id)} strategy={verticalListSortingStrategy}>
				<ul className={`space-y-3 w-full ${reordering ? 'opacity-80 pointer-events-none' : ''}`}>
					{links.map((link) => (
						<li key={link._id}>
							<ItemLink {...link} sortable />
						</li>
					))}
				</ul>
			</SortableContext>
		</DndContext>
	);
};
