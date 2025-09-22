import { Popover } from 'antd';
import { useState } from 'react';
import { usePolygons } from '../../api/queries/polygons';
import type { Coordinate, IPolygonCreate, Polygon } from '../../types/types';
import type { Mode } from '../PanelsContainer';
import PolygonListItem from './PolygonListItem';


interface PolygonPanelProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate; mode: Mode; }) => void
    newPolygonCoordinates: Coordinate[]
}

const PolygonPanel = ({ setDrawingMode, handleFinishPolygon, newPolygonCoordinates }: PolygonPanelProps) => {
    const { data: polygons } = usePolygons();

    const [newPolygonName, setNewPolygonName] = useState('');
    const [polygonToEdit, setPolygonToEdit] = useState<Polygon | null>(null);

    const isNewPolygonNameEmpty = newPolygonName.trim().length === 0;
    const isThereCoordinates = newPolygonCoordinates.length > 2;

    const handleCreatePolygon = () => {
        const polygonToSave = {
            name: newPolygonName,
            coordinates: newPolygonCoordinates,
        }
        handleFinishPolygon({ polygonToSave, mode: { type: "create" } });
        setNewPolygonName('');
    }

    const handleSaveEditedPolygon = ({ newNameToUpdate }: { newNameToUpdate: string }) => {
        const polygonToSave = {
            name: newNameToUpdate,
            coordinates: newPolygonCoordinates.length ? newPolygonCoordinates : polygonToEdit?.coordinates!,
        }
        handleFinishPolygon({ polygonToSave, mode: { type: "update", id: polygonToEdit!.id } });
        setPolygonToEdit(null);
    }

    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול פוליגונים 🗺️</h2>

            <div className="polygon-panel__controls">
                <span className='polygon-panel__controls--description'>צור פוליגון חדש :</span>
                <input
                    type="text"
                    placeholder="הזן שם פוליגון"
                    value={newPolygonName}
                    onChange={(e) => setNewPolygonName(e.target.value)}
                    className="polygon-panel__controls__input"
                />
                <Popover
                    content={isNewPolygonNameEmpty ? "😕 נא להזין שם פוליגון" : "😊 מוכן לסימון קורדינטות"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={isNewPolygonNameEmpty}
                            className="polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn"
                            onClick={() => setDrawingMode('polygon')}
                        >
                            סמן פוליגון
                        </button>
                    </span>
                </Popover>

                <Popover
                    content={(!isThereCoordinates || isNewPolygonNameEmpty) ? "😕 נא לסמן פוליגון" : "😊 הכל מוכן לשמירה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={!isThereCoordinates || isNewPolygonNameEmpty }
                            className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                            onClick={handleCreatePolygon}
                        >
                            שמור
                        </button>
                    </span>
                </Popover>

            </div>

            <ul className="polygon-panel__polygon-list">
                {(polygons?.reverse() ?? []).map(polygon => {
                    const isPolygonToEdit = polygonToEdit?.id === polygon.id;
                    return (
                        <PolygonListItem
                            polygon={polygon}
                            isPolygonToEdit={isPolygonToEdit}
                            setDrawingMode={setDrawingMode}
                            handleSaveEditedPolygon={handleSaveEditedPolygon}
                            setPolygonToEdit={setPolygonToEdit}
                        />
                    )
                })}
            </ul>
        </div>
    );
};

export default PolygonPanel;