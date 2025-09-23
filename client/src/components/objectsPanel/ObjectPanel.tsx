import { Popover } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useObjects } from '../../api/queries/objects';
import type { RootState } from '../../store';
import { setDrawingMode } from '../../store/draftCoordinatesSlice';
import type { IObjectCreate, ObjectMarker } from '../../types/types';
import type { Mode } from '../PanelsContainer';
import ObjectListItem from './ObjectListItem';
import { Select } from 'antd';
import { IconNamesEnum, type IconNamesEnumKey } from '../enums/customSymbolsEnum';

const { Option } = Select;


interface ObjectPanelProps {
    handleSaveObjectMarker: ({ objectToSave, mode }: { objectToSave: IObjectCreate; mode: Mode; }) => void
}

const ObjectPanel = ({ handleSaveObjectMarker }: ObjectPanelProps) => {
    const dispatch = useDispatch()
    const { objectDraftCoordinate } = useSelector((state: RootState) => state.draftCoordinates);
    const { data: objects } = useObjects();

    const [newObjectName, setNewObjectName] = useState('');
    const [objectMarkerToEdit, setObjectMarkerToEdit] = useState<ObjectMarker | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<IconNamesEnumKey>('default');

    const isNewObjectNameEmpty = newObjectName.trim().length === 0;
    const isThereCoordinate = objectDraftCoordinate !== null;

    const handleCreateObjectMarker = () => {
        const objectMarkerToSave: IObjectCreate = {
            name: newObjectName,
            geometry: {
                type: "Marker",
                coordinates: objectDraftCoordinate!,
            },
            symbolType: selectedIcon,
        }

        handleSaveObjectMarker({ objectToSave: objectMarkerToSave, mode: { type: "create" } });
        setNewObjectName('');
    }

    const handleSaveEditedObject = ({ newNameToUpdate }: { newNameToUpdate: string }) => {
        const objectMarkerToSave: IObjectCreate = {
            name: newNameToUpdate,
            geometry: {
                type: "Marker",
                coordinates: objectDraftCoordinate ?? objectMarkerToEdit!.geometry.coordinates,
            },
            symbolType: 'default' as IconNamesEnumKey,
        }
        handleSaveObjectMarker({ objectToSave: objectMarkerToSave, mode: { type: "update", id: objectMarkerToEdit!.id } });
        setObjectMarkerToEdit(null);
    }


    return (
        <div className="management-panel">
            <h2 className="management-panel--title">ניהול אובייקטים 🗺️</h2>

            <div className="management-panel__controls">
                <span className='management-panel__controls--description'>צור אובייקט חדש :</span>
                <input
                    type="text"
                    placeholder="הזן שם אובייקט"
                    value={newObjectName}
                    onChange={(e) => setNewObjectName(e.target.value)}
                    className="management-panel__controls__input"
                />
                <Popover
                    content={isNewObjectNameEmpty ? "😕 נא להזין שם אובייקט" : "😊 מוכן לסימון קורדינטה"}
                    trigger="hover"
                    placement="top"
                >
                    <button
                        disabled={isNewObjectNameEmpty}
                        className="management-panel__controls__btn management-panel__controls__mark-coordinates-btn"
                        onClick={() => dispatch(setDrawingMode('marker'))}
                    >
                        סמן אובייקט
                    </button>
                </Popover>

                <Select
                    value={selectedIcon}
                    className='management-panel__controls__btn management-panel__controls__select-marker-icon'
                    onChange={(val: IconNamesEnumKey) => setSelectedIcon(val)}
                >
                    {Object.entries(IconNamesEnum).map(([key, hebrew]) => (
                        <Option key={key} value={key}
                            className={"management-panel__controls__btn management-panel__controls__select-marker-icon--option"}
                        >
                            {hebrew}
                        </Option>
                    ))}
                </Select>

                <Popover
                    content={
                        (!isThereCoordinate)
                            ? "😕 נא לסמן אובייקט"
                            : isNewObjectNameEmpty
                                ? "😕 נא להזין שם אובייקט"
                                : "😊 הכל מוכן לשמירה"
                    }
                    trigger="hover"
                    placement="top"
                >
                    <button
                        disabled={!isThereCoordinate || isNewObjectNameEmpty}
                        className="management-panel__controls__btn management-panel__controls__create-btn"
                        onClick={handleCreateObjectMarker}
                    >
                        שמור
                    </button>
                </Popover>

            </div>

            <ul className="management-panel__polygon-list">
                {([...(objects ?? [])].reverse()).map(objectMarker => {
                    const isObjectToEdit = objectMarkerToEdit?.id === objectMarker.id;
                    return (
                        <ObjectListItem
                            key={objectMarker.id}
                            objectMarker={objectMarker}
                            isObjectToEdit={isObjectToEdit}
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