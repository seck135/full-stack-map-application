import classNames from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteObject } from "../../api/queries/objects";
import { setDrawingMode } from "../../store/draftCoordinatesSlice";
import type { ObjectMarker } from "../../types/types";
import PolygonEditSaveButton from "./ObjectEditSaveButton";

interface ObjectListItemProps {
    objectMarker: ObjectMarker
    isObjectToEdit: boolean
    handleSaveEditedObject: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setObjectMarkerToEdit: React.Dispatch<React.SetStateAction<ObjectMarker | null>>
}

const ObjectListItem = ({ objectMarker, isObjectToEdit, handleSaveEditedObject, setObjectMarkerToEdit }: ObjectListItemProps) => {
    const dispatch = useDispatch()
    const deleteObjectMarker = useDeleteObject();

    const [editedObjectName, setEditedObjectName] = useState(objectMarker.name);

    return (
        <li key={objectMarker.id} className="list-item">
            {
                isObjectToEdit ?
                    <input
                        type="read"
                        placeholder="הזן שם אובייקט"
                        value={editedObjectName}
                        onChange={(e) => setEditedObjectName(e.target.value)}
                        className="list-item--input"
                    />
                    : <span className="list-item--name">{objectMarker.name}</span>
            }
            <button
                className={classNames("list-item__update-coordinates-btn",
                    isObjectToEdit
                        ? "list-item__update-coordinates-btn--pressable"
                        : "list-item__update-coordinates-btn--disabled"
                )}
                onClick={() => dispatch(setDrawingMode('marker'))}
                disabled={!isObjectToEdit}
            >
                {"לחץ כדי לעדכן מיקום"}
            </button>
            <div className="list-item__actions">
                <PolygonEditSaveButton
                    isObjectToEdit={isObjectToEdit}
                    isNewPolygonNameEmpty={editedObjectName.trim().length === 0}
                    handleSaveEditedObject={handleSaveEditedObject}
                    setObjectMarkerToEdit={setObjectMarkerToEdit}
                    objectMarker={objectMarker}
                    editedObjectName={editedObjectName}
                />
                <button
                    onClick={() => deleteObjectMarker.mutate(objectMarker.id)}
                    disabled={deleteObjectMarker.isPending}
                    className="save-edit-button list-item__actions__delete-btn">
                    {deleteObjectMarker.isPending ? "מוחק..." : "מחק"}
                </button>
            </div>
        </li>
    )
}

export default ObjectListItem;