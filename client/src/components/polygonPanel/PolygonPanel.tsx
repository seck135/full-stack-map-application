import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePolygons } from '../../api/queries/polygons';
import type { RootState } from '../../store';
import type { IPolygonCreate, Polygon } from '../../types/types';
import type { Mode } from '../PanelsContainer';
import CreatePolygonForm from './CreatePolygonForm';
import PolygonListItem from './PolygonListItem';


interface PolygonPanelProps {
    handleSavePolygon: ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate; mode: Mode; }) => void
}

const PolygonPanel = ({ handleSavePolygon, }: PolygonPanelProps) => {
    const dispatch = useDispatch()
    const { polygonDraftCoordinates, } = useSelector((state: RootState) => state.draftCoordinates);


    const { data: polygons } = usePolygons();

    const [newPolygonName, setNewPolygonName] = useState('');
    const [polygonToEdit, setPolygonToEdit] = useState<Polygon | null>(null);

    const isNewPolygonNameEmpty = newPolygonName.trim().length === 0;
    const isThereCoordinates = polygonDraftCoordinates.length > 2;

    const handleCreatePolygon = () => {
        const polygonToSave = {
            name: newPolygonName,
            geometry: {
                type: "Polygon",
                coordinates: [polygonDraftCoordinates],
            },
        }
        handleSavePolygon({ polygonToSave, mode: { type: "create" } });
        setNewPolygonName('');
    }

    const handleSaveEditedPolygon = ({ newNameToUpdate }: { newNameToUpdate: string }) => {
        const polygonToSave = {
            name: newNameToUpdate,
            geometry: {
                type: "Polygon",
                coordinates: polygonDraftCoordinates.length ? [polygonDraftCoordinates] : polygonToEdit?.geometry.coordinates ?? [],
            },
        }
        handleSavePolygon({ polygonToSave, mode: { type: "update", id: polygonToEdit!.id } });
        setPolygonToEdit(null);
    }

    return (
        <div className="management-panel">
            <h2 className="management-panel--title">ניהול פוליגונים 🗺️</h2>

            <CreatePolygonForm
                newPolygonName={newPolygonName}
                setNewPolygonName={setNewPolygonName}
                isNewPolygonNameEmpty={isNewPolygonNameEmpty}
                isThereCoordinates={isThereCoordinates}
                handleCreatePolygon={handleCreatePolygon}
            />

            <ul className="management-panel__polygon-list">
                {([...(polygons ?? [])].reverse()).map(polygon => {
                    const isPolygonToEdit = polygonToEdit?.id === polygon.id;
                    return (
                        <PolygonListItem
                            key={polygon.id}
                            polygon={polygon}
                            isPolygonToEdit={isPolygonToEdit}
                            handleSaveEditedPolygon={handleSaveEditedPolygon}
                            setPolygonToEdit={setPolygonToEdit}
                            isThereCoordinates={polygonDraftCoordinates.length === 0 || polygonDraftCoordinates.length > 2}
                        />
                    )
                })}
            </ul>
        </div>
    );
};

export default PolygonPanel;