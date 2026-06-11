import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	DndContext,
	DragOverlay,
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

import { reorderUserLinks, seedDefaultUserData } from '../redux';
import { DashboardLinkRow } from './DashboardLinkRow';
import { ItemLink } from './ItemLink';
import { Spinner } from './Spinner';
import { EmptyState } from './EmptyState';

export const LinkList = ({ sortable = false, publicView = false }) => {
	const dispatch = useDispatch();
	const { links, loading, reordering } = useSelector((state) => state.link);
	const [activeId, setActiveId] = useState(null);
	const [seeding, setSeeding] = useState(false);

	const visibleLinks = useMemo(() => {
		if (publicView) {
			return links.filter((link) => link.isActive !== false);
		}
		return links;
	}, [links, publicView]);

	const activeLink = links.find((link) => link._id === activeId);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	const handleDragStart = ({ active }) => {
		setActiveId(active.id);
	};

	const handleDragEnd = ({ active, over }) => {
		setActiveId(null);
		if (!over || active.id === over.id) return;

		const oldIndex = links.findIndex((link) => link._id === active.id);
		const newIndex = links.findIndex((link) => link._id === over.id);
		const reordered = arrayMove(links, oldIndex, newIndex);
		const linkIds = reordered.map((link) => link._id);

		dispatch(reorderUserLinks(linkIds));
	};

	const handleDragCancel = () => {
		setActiveId(null);
	};

	if (loading) {
		return <Spinner className='min-h-[30vh]' label='Cargando enlaces...' />;
	}

	const handleSeedDefaults = async () => {
		setSeeding(true);
		await dispatch(seedDefaultUserData());
		setSeeding(false);
	};

	if (visibleLinks.length === 0) {
		return (
			<EmptyState
				description='Empieza desde cero o carga enlaces de ejemplo (Instagram, YouTube, web y contacto) para ver cómo queda tu página.'
				secondaryLabel='Usar datos de ejemplo'
				onSecondaryAction={handleSeedDefaults}
				secondaryLoading={seeding || loading}
			/>
		);
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
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<SortableContext items={links.map((link) => link._id)} strategy={verticalListSortingStrategy}>
				<ul className={`space-y-3 w-full ${reordering ? 'pointer-events-none' : ''}`}>
					{links.map((link) => (
						<li key={link._id}>
							<ItemLink {...link} sortable />
						</li>
					))}
				</ul>
			</SortableContext>

			<DragOverlay dropAnimation={{ duration: 220, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1)' }}>
				{activeLink ? (
					<DashboardLinkRow
						{...activeLink}
						isDragging
						dragHandleProps={{}}
						onToggleFeatured={() => {}}
						onToggleActive={() => {}}
						onEdit={() => {}}
						onDelete={() => {}}
						onOpen={() => {}}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};
