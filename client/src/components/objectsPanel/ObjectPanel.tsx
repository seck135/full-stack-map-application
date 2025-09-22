import { Popover } from 'antd';
import { useState } from 'react';
import { useObjects } from '../../api/queries/objects';
import type { IObjectCreate, ObjectMarker } from '../../types/types';
import type { Mode } from '../PanelsContainer';
import ObjectListItem from './ObjectListItem';


interface ObjectPanelProps {
    handleSaveObjectMarker: ({ objectToSave, mode }: { objectToSave: IObjectCreate; mode: Mode; }) => void
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
}

const ObjectPanel = ({ setDrawingMode, handleSaveObjectMarker }: ObjectPanelProps) => {
    const { data: objects } = useObjects();

    const [newObjectName, setNewObjectName] = useState('');
    const [objectMarkerToEdit, setObjectMarkerToEdit] = useState<ObjectMarker | null>(null);

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
                    content={true ? "😕 נא להזין שם אובייקט" : "😊 מוכן לסימון קורדינטה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={false}
                            className="polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn"
                            onClick={() => setDrawingMode('marker')}
                        >
                            סמן אובייקט
                        </button>
                    </span>
                </Popover>

                <Popover
                    content={(false) ? "😕 נא לסמן אובייקט" : "😊 הכל מוכן לשמירה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={false}
                            className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                        // onClick={handleCreatePolygon}
                        >
                            שמור
                        </button>
                    </span>
                </Popover>

            </div>

            <ul className="polygon-panel__polygon-list">
                {(objects?.reverse() ?? []).map(objectMarker => {
                    const isPolygonToEdit = objectMarkerToEdit?.id === objectMarker.id;
                    return (
                        <ObjectListItem
                            key={objectMarker.id}
                            objectMarker={objectMarker}
                            isPolygonToEdit={isPolygonToEdit}
                            setDrawingMode={setDrawingMode}
                            handleSaveEditedPolygon={() => console.log("")}
                            setPolygonToEdit={setObjectMarkerToEdit}
                        />
                    )
                })}
            </ul>
        </div>
    );
};

export default ObjectPanel;