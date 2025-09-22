import { Popover } from 'antd';
import { useState } from 'react';
import { useObjects } from '../../api/queries/objects';
import type { Coordinate, IObjectCreate, ObjectMarker } from '../../types/types';
import type { Mode } from '../PanelsContainer';
import ObjectListItem from './ObjectListItem';


interface ObjectPanelProps {
    handleSaveObjectMarker: ({ objectToSave, mode }: { objectToSave: IObjectCreate; mode: Mode; }) => void
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    newObjectCoordinate: Coordinate | null
}

const ObjectPanel = ({ setDrawingMode, handleSaveObjectMarker, newObjectCoordinate }: ObjectPanelProps) => {
    const { data: objects } = useObjects();

    const [newObjectName, setNewObjectName] = useState('');
    const [objectMarkerToEdit, setObjectMarkerToEdit] = useState<ObjectMarker | null>(null);

    const isNewObjectNameEmpty = newObjectName.trim().length === 0;
    const isThereCoordinates = newObjectCoordinate !== null;

    const handleCreateObjectMarker = () => {
        const objectMarkerToSave: IObjectCreate = {
            name: newObjectName,
            lat: newObjectCoordinate!.lat,
            lon: newObjectCoordinate!.lon,
        }
        handleSaveObjectMarker({ objectToSave: objectMarkerToSave, mode: { type: "create" } });
        setNewObjectName('');
    }

    const handleSaveEditedObject = ({ newNameToUpdate }: { newNameToUpdate: string }) => {
        const objectMarkerToSave: IObjectCreate = {
            name: newNameToUpdate,
            lat: newObjectCoordinate ? newObjectCoordinate!.lat : objectMarkerToEdit?.lat!,
            lon: newObjectCoordinate ? newObjectCoordinate!.lon : objectMarkerToEdit?.lon!,
        }
        handleSaveObjectMarker({ objectToSave: objectMarkerToSave, mode: { type: "update", id: objectMarkerToEdit!.id } });
        setObjectMarkerToEdit(null);
    }


    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול אובייקטים 🗺️</h2>

            <div className="polygon-panel__controls">
                <span className='polygon-panel__controls--description'>צור אובייקט חדש :</span>
                <input
                    type="text"
                    placeholder="הזן שם אובייקט"
                    value={newObjectName}
                    onChange={(e) => setNewObjectName(e.target.value)}
                    className="polygon-panel__controls__input"
                />
                <Popover
                    content={isNewObjectNameEmpty ? "😕 נא להזין שם אובייקט" : "😊 מוכן לסימון קורדינטה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={isNewObjectNameEmpty}
                            className="polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn"
                            onClick={() => setDrawingMode('marker')}
                        >
                            סמן אובייקט
                        </button>
                    </span>
                </Popover>

                <Popover
                    content={(!isThereCoordinates || isNewObjectNameEmpty) ? "😕 נא לסמן אובייקט" : "😊 הכל מוכן לשמירה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={!isThereCoordinates || isNewObjectNameEmpty}
                            className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                            onClick={handleCreateObjectMarker}
                        >
                            שמור
                        </button>
                    </span>
                </Popover>

            </div>

            <ul className="polygon-panel__polygon-list">
                {([...(objects ?? [])].reverse()).map(objectMarker => {
                    const isObjectToEdit = objectMarkerToEdit?.id === objectMarker.id;
                    return (
                        <ObjectListItem
                            key={objectMarker.id}
                            objectMarker={objectMarker}
                            isObjectToEdit={isObjectToEdit}
                            setDrawingMode={setDrawingMode}
                            handleSaveEditedObject={handleSaveEditedObject}
                            setObjectMarkerToEdit={setObjectMarkerToEdit}
                        />
                    )
                })}
            </ul>
        </div>
    );
};

export default ObjectPanel;