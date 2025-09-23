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
import CreateNewObjectForm from './CreateNewObjectForm';

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
        setSelectedIcon('default')
    }

    const handleSaveEditedObject = ({ newNameToUpdate }: { newNameToUpdate: string }) => {
        const objectMarkerToSave: IObjectCreate = {
            name: newNameToUpdate,
            geometry: {
                type: "Marker",
                coordinates: objectDraftCoordinate ?? objectMarkerToEdit!.geometry.coordinates,
            },
            symbolType: objectMarkerToEdit!.symbolType,
        }
        handleSaveObjectMarker({ objectToSave: objectMarkerToSave, mode: { type: "update", id: objectMarkerToEdit!.id } });
        setObjectMarkerToEdit(null);
    }


    return (
        <div className="management-panel">
            <h2 className="management-panel--title">ניהול אובייקטים 🗺️</h2>

            <CreateNewObjectForm
                newObjectName={newObjectName}
                setNewObjectName={setNewObjectName}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                isNewObjectNameEmpty={isNewObjectNameEmpty}
                isThereCoordinate={isThereCoordinate}
                handleCreateObjectMarker={handleCreateObjectMarker}
            />


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